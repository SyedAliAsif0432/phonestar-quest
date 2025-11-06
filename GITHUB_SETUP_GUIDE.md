# GitHub Setup Guide for Phonester Quest

This guide will walk you through pushing your project to GitHub step by step.

## Prerequisites

- Git installed on your computer (check with `git --version`)
- A GitHub account ([github.com](https://github.com))
- Your project files ready

## Step-by-Step Instructions

### Step 1: Create a GitHub Repository

1. **Go to GitHub:**
   - Visit [github.com](https://github.com) and sign in (or create an account)

2. **Create a new repository:**
   - Click the **"+"** icon in the top right
   - Select **"New repository"**

3. **Configure your repository:**
   - **Repository name:** `phonester-quest` (or your preferred name)
   - **Description:** (Optional) e.g., "A Phaser.js adventure game"
   - **Visibility:** 
     - Choose **Public** (free, anyone can see)
     - Or **Private** (only you can see, requires GitHub Pro for free private repos)
   - **DO NOT** check:
     - ❌ "Add a README file" (you already have files)
     - ❌ "Add .gitignore" (you already have one)
     - ❌ "Choose a license" (optional, can add later)
   - Click **"Create repository"**

4. **Copy the repository URL:**
   - GitHub will show you a page with setup instructions
   - **Copy the HTTPS URL** (looks like: `https://github.com/yourusername/phonester-quest.git`)
   - **OR copy the SSH URL** if you have SSH keys set up (looks like: `git@github.com:yourusername/phonester-quest.git`)
   - Keep this URL handy for Step 4

### Step 2: Check Your Current Git Status

Open your terminal/command prompt in your project directory and check:

```bash
git status
```

You should see:
- Files that are modified
- Files that are untracked (new files)
- Your current branch (likely `dev` or `main`)

### Step 3: Stage All Your Files

Add all your files to Git staging:

```bash
# Add all files (including new, modified, and deleted)
git add .
```

Or if you want to be more selective:
```bash
# Add specific files
git add vercel.json
git add DEPLOYMENT_GUIDE.md
git add src/
# etc.
```

**Verify what's staged:**
```bash
git status
```
You should see files listed under "Changes to be committed"

### Step 4: Commit Your Changes

Create a commit with a descriptive message:

```bash
git commit -m "Initial commit: Phonester Quest game with Vercel deployment config"
```

Or use a more detailed message:
```bash
git commit -m "Add Vercel deployment configuration and complete game scenes

- Add vercel.json for deployment
- Add deployment guide
- Include all game scenes and assets
- Configure for production deployment"
```

### Step 5: Connect to GitHub Remote

**Option A: If you DON'T have a remote yet (first time pushing)**

Add your GitHub repository as the remote origin:

```bash
git remote add origin https://github.com/yourusername/phonester-quest.git
```

Replace `yourusername` and `phonester-quest` with your actual GitHub username and repository name.

**Option B: If you already have a remote but want to change it**

Check existing remotes:
```bash
git remote -v
```

If you need to update the URL:
```bash
git remote set-url origin https://github.com/yourusername/phonester-quest.git
```

Or remove and re-add:
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/phonester-quest.git
```

### Step 6: Push to GitHub

**If you're on the `dev` branch (recommended):**

```bash
# Push dev branch to GitHub
git push -u origin dev
```

**If you want to push to `main` branch:**

First, switch to or create main branch:
```bash
# Option 1: Rename current branch to main
git branch -M main

# Option 2: Create main from dev
git checkout -b main
git merge dev
```

Then push:
```bash
git push -u origin main
```

**The `-u` flag** sets up tracking so future pushes are simpler.

### Step 7: Verify on GitHub

1. **Refresh your GitHub repository page**
2. **You should see:**
   - All your files listed
   - Your commit message
   - The branch you pushed to

3. **Check your files:**
   - Click on files to verify they uploaded correctly
   - Check that `node_modules` and `dist` are NOT there (they're in `.gitignore`)

## Complete Command Sequence (Quick Reference)

If you're starting fresh, here's the complete sequence:

```bash
# 1. Check status
git status

# 2. Stage all files
git add .

# 3. Commit
git commit -m "Initial commit: Phonester Quest game"

# 4. Add remote (replace with your URL)
git remote add origin https://github.com/yourusername/phonester-quest.git

# 5. Push to GitHub
git push -u origin dev
# OR
git push -u origin main
```

## Working with Branches (Best Practice)

Based on your project setup, you're using a `dev` branch. Here's the workflow:

### Push Dev Branch First:
```bash
git push -u origin dev
```

### Create/Update Main Branch:
```bash
# Switch to main (or create it)
git checkout main
# OR if main doesn't exist:
git checkout -b main

# Merge dev into main
git merge dev

# Push main
git push -u origin main
```

### Future Workflow:
```bash
# Work on dev branch
git checkout dev
# Make changes, commit, then:
git push origin dev

# When ready to deploy, merge to main
git checkout main
git merge dev
git push origin main
```

## Troubleshooting

### Error: "remote origin already exists"

You already have a remote. Check it:
```bash
git remote -v
```

Update it if needed:
```bash
git remote set-url origin https://github.com/yourusername/phonester-quest.git
```

### Error: "failed to push some refs"

This usually means the remote has commits you don't have. Options:

**Option 1: Pull first (if you want to merge)**
```bash
git pull origin dev --allow-unrelated-histories
git push origin dev
```

**Option 2: Force push (⚠️ only if you're sure you want to overwrite)**
```bash
git push -u origin dev --force
```

### Error: Authentication failed

**For HTTPS:**
- GitHub no longer accepts passwords for HTTPS
- Use a Personal Access Token instead:
  1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with `repo` permissions
  3. Use the token as your password when prompted

**For SSH:**
- Set up SSH keys: [GitHub SSH Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Large Files Warning

If you have very large image files or assets:
- GitHub has a 100MB file size limit
- Consider using Git LFS for large files:
  ```bash
  git lfs install
  git lfs track "*.png"
  git lfs track "*.jpg"
  git add .gitattributes
  git add .
  git commit -m "Add large files with Git LFS"
  git push origin dev
  ```

## Next Steps After Pushing

1. ✅ **Verify all files are on GitHub**
2. ✅ **Set up branch protection** (optional, in repository settings)
3. ✅ **Add a README.md** with project description
4. ✅ **Deploy to Vercel** (see `DEPLOYMENT_GUIDE.md`)
5. ✅ **Set up GitHub Actions** (optional, for CI/CD)

## Useful Git Commands Reference

```bash
# Check status
git status

# See what branch you're on
git branch

# Switch branches
git checkout branch-name

# Create new branch
git checkout -b new-branch-name

# See commit history
git log --oneline

# See remote repositories
git remote -v

# Pull latest changes
git pull origin dev

# Push changes
git push origin dev
```

## Security Notes

- ✅ **Never commit:**
  - API keys or secrets
  - `.env` files with sensitive data
  - Personal information
  - Large binary files (use Git LFS)

- ✅ **Your `.gitignore` already excludes:**
  - `node_modules/`
  - `dist/`
  - Log files
  - Editor configs

## Need Help?

- **Git Documentation:** [git-scm.com/doc](https://git-scm.com/doc)
- **GitHub Guides:** [guides.github.com](https://guides.github.com)
- **GitHub Support:** [support.github.com](https://support.github.com)

---

**Happy Coding! 🚀**

