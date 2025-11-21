# GitHub Copilot Agent Setup Guide

This guide explains how to use the GitHub Copilot coding agent instructions created in this repository for the meshery-extensions-packages repository and the broader Layer5/Meshery ecosystem.

## Overview

This repository contains two comprehensive instruction documents for GitHub Copilot coding agents:

1. **`.github/copilot-instructions.md`** - Repository-specific instructions for meshery-extensions-packages
2. **`AGENTS.md`** - General guidelines for all Layer5/Meshery repositories

## For the meshery-extensions-packages Repository

To implement these instructions in the meshery-extensions-packages repository:

### Option 1: Direct File Copy (Recommended)

Copy the `.github/copilot-instructions.md` file from this repository to the meshery-extensions-packages repository:

```bash
# Clone meshery-extensions-packages with sparse checkout
git clone --filter=blob:none --sparse https://github.com/layer5labs/meshery-extensions-packages
cd meshery-extensions-packages

# Create .github directory if it doesn't exist
mkdir -p .github

# Copy the instruction file from kanvas-snapshot
cp /path/to/kanvas-snapshot/.github/copilot-instructions.md .github/

# Commit and push
git add .github/copilot-instructions.md
git commit -m "Add GitHub Copilot coding agent instructions"
git push origin main
```

### Option 2: Create PR with Instructions

1. Fork the meshery-extensions-packages repository
2. Create a new branch: `git checkout -b feature/add-copilot-instructions`
3. Create `.github/copilot-instructions.md` with the content from this repository
4. Commit and push the changes
5. Open a pull request to the main repository

### Option 3: Reference from Another Repository

If you prefer to maintain a single source of truth, you can reference these instructions from meshery-extensions-packages:

```markdown
# .github/copilot-instructions.md (in meshery-extensions-packages)

# GitHub Copilot Coding Agent Instructions

For comprehensive instructions on working with this repository, please see:
- [meshery-extensions-packages specific instructions](https://github.com/layer5labs/kanvas-snapshot/blob/main/.github/copilot-instructions.md)
- [General Layer5/Meshery guidelines](https://github.com/layer5labs/kanvas-snapshot/blob/main/AGENTS.md)

## Quick Reference

### Critical: Always Use Sparse Checkout

This repository is very large. Always use sparse checkout:

\`\`\`bash
git clone --filter=blob:none --sparse https://github.com/layer5labs/meshery-extensions-packages
git sparse-checkout add assets/badges  # or other needed directories
\`\`\`

### In GitHub Actions

\`\`\`yaml
- uses: actions/checkout@v4
  with:
    sparse-checkout: |
      assets/badges
      email
    sparse-checkout-cone-mode: false
\`\`\`

[Full documentation →](https://github.com/layer5labs/kanvas-snapshot/blob/main/.github/copilot-instructions.md)
```

## How GitHub Copilot Uses These Instructions

### Automatic Detection

GitHub Copilot automatically reads instructions from:
- `.github/copilot-instructions.md` in the repository root
- Custom agent manifests configured in repository settings

### What Copilot Learns

From these instructions, Copilot learns to:
- Always use sparse checkout for meshery-extensions-packages
- Understand the multi-function nature of the repository
- Follow proper asset management patterns
- Implement secure CI/CD workflows
- Handle cross-repository integrations correctly
- Apply Layer5/Meshery ecosystem best practices

## Testing the Instructions

### Manual Testing

Test that Copilot respects the instructions by asking it to:

1. "Clone the meshery-extensions-packages repository"
   - **Expected:** It should suggest using sparse checkout

2. "Create a GitHub Action that updates badge files"
   - **Expected:** It should include sparse checkout configuration

3. "Add a new snapshot to the repository"
   - **Expected:** It should place it in the correct directory structure

### Validation Checklist

- [ ] Copilot suggests sparse checkout for large repositories
- [ ] Copilot follows the documented directory structure
- [ ] Copilot implements proper security practices (no secret leakage)
- [ ] Copilot includes both light and dark versions for images
- [ ] Copilot uses proper error handling in workflows
- [ ] Copilot references correct branch names (main vs master)

## Customization

### Adding Repository-Specific Rules

To add repository-specific rules to the meshery-extensions-packages instructions:

1. Edit `.github/copilot-instructions.md` in meshery-extensions-packages
2. Add sections for specific workflows or patterns unique to that repo
3. Keep the core sparse checkout and cross-repository patterns
4. Document any new asset types or directory structures

Example addition:

```markdown
## Custom Badge Creation Process

When creating a new badge for the Layer5 Recognition Program:

1. Design SVG in `/assets/badges/<badge-name>/`
2. Generate PNG versions at 512x512 and 1024x1024
3. Update badge registry at `https://badges.layer5.io`
4. Test rendering in email templates
5. Verify accessibility and color contrast
```

### Updating Instructions

As the repository evolves:

1. Keep instructions in sync with actual practices
2. Document new patterns and workflows
3. Update examples when APIs or tools change
4. Add troubleshooting entries for common issues
5. Review instructions quarterly for accuracy

## Integration with Other Repositories

### For Developers Working Across Multiple Repos

The `AGENTS.md` file provides guidelines that apply across all Layer5/Meshery repositories:

- kanvas-snapshot
- meshery
- meshery-cloud
- meshery-extensions
- meshery-extensions-packages

### Cross-Repository Workflow Example

When creating a feature that spans multiple repositories:

```yaml
# In kanvas-snapshot workflow
name: Update Snapshot and Badge
jobs:
  generate-and-update:
    runs-on: ubuntu-latest
    steps:
      # 1. Work in kanvas-snapshot
      - uses: actions/checkout@v4
        with:
          repository: layer5labs/kanvas-snapshot
          path: action

      # 2. Generate snapshot
      - name: Generate snapshot
        run: ./action/scripts/generate-snapshot.sh

      # 3. Update meshery-extensions-packages (SPARSE!)
      - uses: actions/checkout@v4
        with:
          repository: layer5labs/meshery-extensions-packages
          token: ${{ secrets.PAT_TOKEN }}
          sparse-checkout: |
            action-assets
            design-assets
          path: packages

      # 4. Upload snapshot
      - name: Upload to packages repo
        run: |
          cp snapshot.png packages/action-assets/2024@11/
          cd packages
          git config user.name "meshery-bot"
          git add action-assets
          git commit -m "Add snapshot for design ${{ env.DESIGN_ID }}"
          git push
```

## Troubleshooting

### Copilot Doesn't Follow Instructions

**Possible Causes:**
1. Instructions file not in the correct location (must be `.github/copilot-instructions.md`)
2. File contains syntax errors or invalid markdown
3. Instructions are too verbose or conflicting
4. Repository doesn't have Copilot enabled

**Solutions:**
- Verify file location and name exactly
- Validate markdown syntax using a linter
- Simplify and clarify instructions
- Check repository Copilot settings

### Instructions Not Updating

**Issue:** Made changes but Copilot still uses old instructions

**Solution:**
- Clear Copilot cache (if applicable)
- Restart IDE/editor
- Wait a few minutes for GitHub to index changes
- Ensure changes are committed and pushed

### Conflicts Between Instructions

**Issue:** Instructions in AGENTS.md conflict with copilot-instructions.md

**Solution:**
- copilot-instructions.md (repository-specific) takes precedence
- Ensure repository-specific instructions override general ones when needed
- Document any intentional deviations in comments

## Best Practices

1. **Keep Instructions Focused**
   - Be specific about critical requirements (like sparse checkout)
   - Provide concrete examples
   - Document "why" not just "what"

2. **Update Regularly**
   - Review instructions when patterns change
   - Add troubleshooting entries for recurring issues
   - Remove outdated information

3. **Test Instructions**
   - Have team members try following them
   - Test with actual Copilot suggestions
   - Validate examples work as written

4. **Collaborate**
   - Get feedback from repository maintainers
   - Involve team in documentation updates
   - Share learnings across repositories

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Layer5 Community Handbook](https://layer5.io/community/handbook)
- [Meshery Documentation](https://docs.meshery.io)
- [Contributing Guidelines](https://github.com/layer5io/layer5/blob/master/CONTRIBUTING.md)

## Support

For questions or issues:
- Open an issue in the appropriate repository
- Join [Layer5 Slack](https://slack.layer5.io) - #meshery channel
- Visit [Layer5 Community Forum](https://discuss.layer5.io)
- Attend [Community Meetings](https://meet.layer5.io)

---

**Note:** These instructions are living documents. Contributions and improvements are welcome!
