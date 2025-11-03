#!/usr/bin/env python3
"""
Download images from Microsoft Installation Instructions Confluence page
"""

import os
import re
import requests
from urllib.parse import urlparse, parse_qs

# The page content we already have from the Confluence API
PAGE_BODY = """The Microsoft 365 MCP Servers in the Nexus app can be applied to a number of different Microsoft customer types:

* [Personal Outlook users](https://civicteam.atlassian.net/wiki/spaces/Labs/pages/edit-v2/3793944577#Personal-Outlook-users)
* [Microsoft 365 users](https://civicteam.atlassian.net/wiki/spaces/Labs/pages/edit-v2/3793944577#Microsoft-365-Business-users)
* [Microsoft Azure Cloud tenants](https://civicteam.atlassian.net/wiki/spaces/Labs/pages/edit-v2/3793944577#Microsoft-Azure-Cloud-tenants)

[... rest of content with blob URLs ...]
"""

def extract_image_ids_from_blob_urls(content):
    """
    Extract image IDs from Confluence blob URLs
    Format: blob:https://media.staging.atl-paas.net/?...&id=<IMAGE_ID>&...
    """
    # Match blob URLs with id parameter
    pattern = r'id=([a-f0-9\-]+)'
    matches = re.findall(pattern, content)
    return matches

def download_confluence_attachment(cloud_id, page_id, attachment_id, output_path, auth_token):
    """
    Download an attachment from Confluence using the REST API
    """
    url = f"https://civicteam.atlassian.net/wiki/rest/api/content/{page_id}/child/attachment/{attachment_id}/download"

    headers = {
        'Authorization': f'Bearer {auth_token}',
        'Accept': 'image/*'
    }

    response = requests.get(url, headers=headers, stream=True)

    if response.status_code == 200:
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Downloaded: {output_path}")
        return True
    else:
        print(f"Failed to download {attachment_id}: {response.status_code}")
        return False

def main():
    # Configuration
    page_id = "3793944577"
    output_dir = "public/images/ms365-setup"
    auth_token = os.getenv('CONFLUENCE_TOKEN')

    if not auth_token:
        print("Error: Set CONFLUENCE_TOKEN environment variable")
        return

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # For now, let's print what we found
    print("This approach won't work because blob URLs are session-specific.")
    print("\nBetter approach: Use Confluence API to get attachments list from the page")
    print("Then download each attachment by ID")

if __name__ == '__main__':
    main()
