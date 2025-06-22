# Civic Documentation

Welcome to the Civic documentation repository\! This site powers our customer-facing documentation at [docs.civic.com](https://docs.civic.com/) using [Mintlify](https://mintlify.com/docs).

## 🚀 Quick Start

### For Developers (Recommended for branch-based updates)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd docs.civic.com
   ```
2. **Install Mintlify CLI**

   ```bash
   npm install -g mintlify
   ```
3. **Start local development server**

   ```bash
   npx mint dev
   ```

   This will start a local preview at `http://localhost:3000`
4. **Make your changes** and preview them locally
5. **Create a branch and push**

   ```bash
   git checkout -b feature/your-update
   git add .
   git commit -m "Update documentation"
   git push origin feature/your-update
   ```
6. **Open a Pull Request** - Mintlify will automatically create a preview deployment for your branch

### For Non-Developers (Quick edits)

Use the [Mintlify Web Editor](https://mintlify.com/docs/web-editor) for quick updates:

1. Navigate to the [Mintlify dashboard](https://dashboard.mintlify.com/civic/civic)
2. Select your documentation project
3. Use the browser-based editor to make changes
4. Changes are deployed automatically

## 📋 Documentation Structure

Our documentation follows Mintlify's structure with these key files:

- `docs.json` - Main configuration file for navigation, themes, and settings
- `/pages/` - Individual documentation pages (MDX format)
- `/api-reference/` - API documentation files
- `/images/` - Static assets and images
- `/snippets/` - Reusable content snippets

## 🔄 Workflow & Best Practices

### Branch-Based Development (Developers)

✅ **Best for:**

- Substantial content updates
- New feature documentation
- Structural changes
- Code examples and snippets

**Workflow:**

1. Create a feature branch
2. Make changes locally with `npx mint dev` for preview
3. Push branch - automatic Mintlify preview is generated
4. Review changes in both local and Mintlify preview
5. Submit PR for team review
6. Merge to main for production deployment

### Web Editor (Non-Developers)

✅ **Best for:**

- Quick text fixes
- Typo corrections
- Small content updates
- Urgent documentation changes

**Benefits:**

- No local setup required
- Real-time preview
- Immediate deployment
- User-friendly interface

## 🛠️ Development Commands

```bash
# Start local development server
npx mint dev

# Install Mintlify CLI globally
npm install -g mintlify

# Check for broken links and issues
npx mint check
```

## 🌟 Features & Components

Our documentation leverages Mintlify's rich component library:

- **Code Blocks** with syntax highlighting
- **API Playground** for interactive testing
- **Callouts** for important information
- **Tabs** for organized content
- **Cards** for feature highlights
- **Accordions** for expandable sections

For a complete list of available components, see the [Mintlify Components Documentation](https://mintlify.com/docs/components).

### 🎨 Custom Styling

We have a `custom.css` file that provides additional styling classes, particularly useful for image formatting:

**Image Width Classes:**

- `.image-50` - 50% width
- `.image-60` - 60% width
- `.image-70` - 70% width
- `.image-80` - 80% width

**Image Styling:**

- `.image-rounded` - Adds border radius

**Usage Example:**

```mdx
<Frame>
  <img
    src="/images/example.png"
    alt="Example"
    className="image-70 image-rounded"
  />
</Frame>
```

**Note:** Apply the `className` directly to the `img` tag, not the Frame component, as the editor may remove classes from Frame components.

These classes automatically adjust to 90% width on mobile devices for responsive design.

## 🔗 Link Checker

To ensure all links are valid and working:

```bash
lychee --verbose --root-dir $(pwd) --fallback-extensions mdx,md --include-fragments **/*.mdx
```

## 📦 Preview Deployments

Every branch automatically gets a preview deployment:

- **Main branch**: [docs.civic.com](https://docs.civic.com/)
- **Feature branches**: Preview URLs provided in PR comments
- **Local development**: `http://localhost:3000`

## 📚 Useful Resources

- [Mintlify Documentation](https://mintlify.com/docs) - Complete guide and reference
- [Mintlify Dashboard](https://dashboard.mintlify.com/civic/civic) - Access the web editor and project settings
- [Mintlify Quickstart](https://mintlify.com/docs/quickstart) - Get started in minutes
- [MDX Documentation](https://mdxjs.com/) - Learn about MDX syntax
- [Civic Auth Documentation](https://docs.civic.com/) - Our live documentation site

## 🆘 Getting Help

- **For Mintlify-specific questions**: Check the [Mintlify docs](https://mintlify.com/docs) or their community
- **For content questions**: Reach out to the documentation team
- **For technical issues**: Create an issue in this repository

## 📝 Contributing

1. Follow the branch-based workflow for substantial changes
2. Use the web editor for quick fixes
3. Ensure all links work and code examples are tested
4. Preview changes before submitting PRs
5. Write clear commit messages describing your changes

---

**Need to make an update?**

- 👩‍💻 **Developer?** Use the branch workflow with local preview
- 🖊️ **Quick edit?** Use the Mintlify web editor

Happy documenting\! 🚀 Thanks\!