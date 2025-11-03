#!/usr/bin/env node

/**
 * Script to download images from a Confluence page
 * Usage: node download-confluence-images.js <pageId> <outputDir>
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CONFLUENCE_BASE_URL = 'civicteam.atlassian.net';
const CONFLUENCE_API_PATH = '/wiki/api/v2/pages/';

async function getConfluencePage(pageId, authToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: CONFLUENCE_BASE_URL,
      path: `${CONFLUENCE_API_PATH}${pageId}?body-format=storage`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed to fetch page: ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

async function downloadImage(imageUrl, outputPath, authToken) {
  return new Promise((resolve, reject) => {
    const url = new URL(imageUrl);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'image/*'
      }
    };

    https.get(options, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(outputPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(outputPath);
        });
      } else {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

function extractImageUrls(htmlContent) {
  // Extract blob URLs from Confluence content
  const blobRegex = /blob:https:\/\/[^"'\s]+/g;
  const matches = htmlContent.match(blobRegex) || [];
  return matches;
}

async function main() {
  const pageId = process.argv[2];
  const outputDir = process.argv[3] || './images';
  const authToken = process.env.CONFLUENCE_TOKEN;

  if (!pageId) {
    console.error('Usage: node download-confluence-images.js <pageId> <outputDir>');
    process.exit(1);
  }

  if (!authToken) {
    console.error('Error: CONFLUENCE_TOKEN environment variable not set');
    process.exit(1);
  }

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log(`Fetching Confluence page ${pageId}...`);
    const page = await getConfluencePage(pageId, authToken);

    const imageUrls = extractImageUrls(page.body.storage.value);
    console.log(`Found ${imageUrls.length} images`);

    const downloadedImages = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const filename = `image-${i + 1}.png`;
      const outputPath = path.join(outputDir, filename);

      console.log(`Downloading image ${i + 1}/${imageUrls.length}...`);
      await downloadImage(imageUrl, outputPath, authToken);
      downloadedImages.push({ url: imageUrl, path: outputPath });
    }

    console.log('\nDownload complete!');
    console.log('Downloaded images:');
    downloadedImages.forEach(img => {
      console.log(`  ${img.path}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
