# GitHub Desktop Setup Guide for Phonester Quest

This guide will walk you through pushing your project to GitHub using GitHub Desktop (the easiest way!).

## Prerequisites

- GitHub Desktop installed ([desktop.github.com](https://desktop.github.com))
- A GitHub account ([github.com](https://github.com))
- Your project files ready

## Step-by-Step Instructions

### Step 1: Sign In to GitHub Desktop

1. **Open GitHub Desktop**
2. **If not signed in:**
   - Click **"Sign in to GitHub.com"** or go to **File → Options → Accounts**
   - Sign in with your GitHub credentials
   - Authorize GitHub Desktop if prompted

### Step 2: Create a GitHub Repository (Online)

1. **Go to GitHub.com in your browser:**
   - Visit [github.com](https://github.com) and sign in

2. **Create a new repository:**
   - Click the **"+"** icon in the top right
   - Select **"New repository"**

3. **Configure your repository:**
   - **Repository name:** `phonester-quest` (or your preferred name)
   - **Description:** (Optional) e.g., "A Phaser.js adventure game"
   - **Visibility:** 
     - Choose **Public** (free, anyone can see)
     - Or **Private** (only you can see)
   - **DO NOT** check any of these:
     - ❌ "Add a README file"
     - ❌ "Add .gitignore"
     - ❌ "Choose a license"
   - Click **"Create repository"**

4. **Don't close this page yet** - you'll need it in Step 4

### Step 3: Open Your Project in GitHub Desktop

**Option A: If your project is already open in GitHub Desktop:**
- You should see it in the repository list on the left
- If not, continue to Option B

**Option B: Add your existing repository:**
1. In GitHub Desktop, click **"File" → "Add Local Repository"**
2. Click **"Choose..."** and navigate to your project folder:
   - `D:\cursor_AI\phonester-quest`
3. Click **"Add Repository"**
4. GitHub Desktop will detect it's already a Git repository

### Step 4: Connect to GitHub Repository

1. **In GitHub Desktop, you should see:**
   - Your current branch (likely `dev`)
   - A list of changed files on the left
   - A commit message box at the bottom

2. **If you see "Publish repository" button:**
   - Click **"Publish repository"** button (top right)
   - Select your GitHub account
   - Choose the repository name: `phonester-quest`
   - **Uncheck** "Keep this code private" if you want it public
   - Click **"Publish Repository"**

3. **If you don't see "Publish repository" (already connected):**
   - Go to **"Repository" → "Repository Settings" → "Remote"**
   - Check the remote URL matches your GitHub repository
   - If it doesn't, click **"Primary remote repository" → "Change remote URL"**
   - Enter: `https://github.com/yourusername/phonester-quest.git`
   - Replace `yourusername` with your actual GitHub username

### Step 5: Stage Your Changes

1. **In the left panel, you'll see:**
   - **"Changes"** tab showing all modified and new files
   - Files with checkboxes next to them

2. **Review your changes:**
   - You should see files like:
     - `vercel.json` (new)
     - `DEPLOYMENT_GUIDE.md` (new)
     - `GITHUB_DESKTOP_GUIDE.md` (new)
     - Modified files in `src/`
     - New image assets
     - etc.

3. **Select files to commit:**
   - **To select all files:** Check the box at the top next to "Changes" or press `Ctrl+A`
   - **To select specific files:** Check individual file boxes
   - **Recommended:** Select all files for your first push

### Step 6: Write a Commit Message

1. **At the bottom of GitHub Desktop, you'll see:**
   - A text box labeled **"Summary"** (required)
   - A text box labeled **"Description"** (optional)

2. **Enter your commit message:**
   - **Summary:** `Add Vercel deployment config and complete game`
   - **Description (optional):**
     ```
     - Add vercel.json for Vercel deployment
     - Add deployment and GitHub setup guides
     - Include all game scenes and assets
     - Configure for production deployment
     ```

### Step 7: Commit Your Changes

1. **Click the "Commit to dev" button** (or "Commit to main" if on main branch)
   - The button is at the bottom left
   - This commits your changes locally (doesn't push yet)

2. **You should see:**
   - Files move from "Changes" to "History" tab
   - A success message
   - The commit appears in your history

### Step 8: Push to GitHub

1. **After committing, you'll see:**
   - A button that says **"Push origin"** or **"Publish branch"** at the top
   - Or a notification saying "X commits ahead of origin/dev"

2. **Click "Push origin"** (or "Publish branch" if it's the first push)
   - This uploads your code to GitHub
   - You'll see a progress indicator

3. **Wait for it to complete:**
   - Usually takes 10-30 seconds depending on file size
   - You'll see a success message when done

### Step 9: Verify on GitHub

1. **Go back to your browser** where you created the repository
2. **Refresh the page** (F5)
3. **You should see:**
   - All your files listed
   - Your commit message
   - The branch you pushed to (`dev`)

4. **Click on files** to verify they uploaded correctly

## Working with Branches in GitHub Desktop

### Current Setup (You're on `dev` branch)

**To push your dev branch:**
1. Make sure you're on the `dev` branch (check top left)
2. Commit and push as described above

### Creating/Updating Main Branch

**Option 1: Create main from dev**
1. Click **"Branch" → "New Branch"**
2. Name it: `main`
3. Make sure "Based on" is set to `dev`
4. Click **"Create Branch"**
5. Commit and push: **"Publish branch"**

**Option 2: Switch to main if it exists**
1. Click the **branch dropdown** (top left, shows current branch)
2. Select `main`
3. If you want to merge dev into main:
   - Click **"Branch" → "Merge into current branch"**
   - Select `dev`
   - Click **"Merge dev into main"**
4. Push: **"Push origin"**

## Future Workflow (After Initial Push)

### Making Changes and Pushing Updates:

1. **Make changes** to your code in your editor
2. **GitHub Desktop will detect changes:**
   - Files appear in the "Changes" tab
   - You'll see what was modified

3. **Stage, commit, and push:**
   - Select files (or all)
   - Write commit message
   - Click **"Commit to dev"**
   - Click **"Push origin"**

### Syncing with GitHub:

- **Pull latest changes:** Click **"Fetch origin"** or **"Pull origin"** (if you have changes on GitHub)
- **Push your changes:** Click **"Push origin"** (after committing)

## Visual Guide to GitHub Desktop Interface

```
┌─────────────────────────────────────────┐
│  [Repository: phonester-quest]  [dev ▼] │  ← Repository & Branch
├─────────────────────────────────────────┤
│                                         │
│  [Changes] [History] [Branch]          │  ← Tabs
│                                         │
│  ☑ vercel.json                         │  ← Files to commit
│  ☑ DEPLOYMENT_GUIDE.md                 │
│  ☑ src/scenes/...                      │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Summary: [Add Vercel config...]       │  ← Commit message
│                                         │
│  Description:                           │
│  [Optional details...]                  │
│                                         │
│  [Commit to dev]  [Push origin]        │  ← Action buttons
└─────────────────────────────────────────┘
```

## Troubleshooting

### "Repository not found" Error

- Make sure you created the repository on GitHub first
- Check the repository name matches exactly
- Verify you're signed into the correct GitHub account

### "Authentication failed" Error

1. Go to **"File" → "Options" → "Accounts"**
2. Sign out and sign back in
3. Try pushing again

### Large Files Warning

If you have very large image files:
- GitHub has a 100MB file size limit
- Consider compressing images before committing
- Or use Git LFS (Large File Storage) - advanced option

### Files Not Showing Up

- Make sure files aren't in `.gitignore`
- Check that you've saved files in your editor
- Refresh GitHub Desktop: **"Repository" → "Refresh"**

### Can't See "Publish repository" Button

- Your repository might already be connected
- Check **"Repository" → "Repository Settings" → "Remote"**
- If remote exists, just use "Push origin" instead

## Quick Reference: Common Actions

| Action | How to Do It |
|--------|-------------|
| **Stage all files** | Check the box next to "Changes" or press `Ctrl+A` |
| **Commit** | Write message, click "Commit to [branch]" |
| **Push** | Click "Push origin" button |
| **Pull** | Click "Fetch origin" then "Pull origin" |
| **Switch branch** | Click branch dropdown (top left) |
| **Create branch** | Branch → New Branch |
| **View history** | Click "History" tab |
| **View changes** | Click on a file in Changes tab |

## Next Steps After Pushing

1. ✅ **Verify all files are on GitHub** (check in browser)
2. ✅ **Deploy to Vercel** (see `DEPLOYMENT_GUIDE.md`)
   - Vercel can connect directly to your GitHub repository
3. ✅ **Add a README.md** (optional, describe your project)
4. ✅ **Set up branch protection** (optional, in GitHub repository settings)

## Tips for GitHub Desktop

- **Keyboard shortcuts:**
  - `Ctrl+Shift+C` - Commit
  - `Ctrl+Shift+P` - Push
  - `Ctrl+Shift+F` - Fetch

- **View file changes:**
  - Click any file in the Changes tab to see a diff
  - Green = additions, Red = deletions

- **Undo last commit:**
  - Right-click on commit in History
  - Select "Undo commit"
  - ⚠️ Only do this if you haven't pushed yet!

## Need Help?

- **GitHub Desktop Docs:** [docs.github.com/desktop](https://docs.github.com/desktop)
- **GitHub Support:** [support.github.com](https://support.github.com)
- **GitHub Desktop Issues:** Check the Help menu in GitHub Desktop

---

**You're all set! Your project is now on GitHub! 🎉**

