# 🤖 Social Media Automation - Quick Start

## ✅ What's Set Up

1. **RSS Feed**: https://benchthebots.ai/rss.xml
2. **GitHub Action**: Auto-posts when you push new content
3. **Social Accounts**:
   - X: @zanemerrik
   - Bluesky: zanemerrik.bsky.social

## 🚀 Next Steps to Activate

### 1. Get X (Twitter) API Keys

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Sign in with @zanemerrik account
3. Create a new **Project** and **App**
4. Go to app → **Keys and tokens**
5. Generate all 4 credentials:
   - API Key
   - API Secret
   - Access Token
   - Access Token Secret
6. **Important**: Set app permissions to "Read and Write"

### 2. Get Bluesky App Password

1. Go to Bluesky → Settings → App Passwords
2. Create new app password
3. Name it: "GitHub Automation"
4. Copy the password (can't see it again!)

### 3. Add Secrets to GitHub

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each:

```
TWITTER_API_KEY          → (from step 1)
TWITTER_API_SECRET       → (from step 1)
TWITTER_ACCESS_TOKEN     → (from step 1)
TWITTER_ACCESS_SECRET    → (from step 1)
BLUESKY_HANDLE           → zanemerrik.bsky.social
BLUESKY_PASSWORD         → (from step 2)
```

### 4. Test It!

**Option A - Automatic (recommended):**
1. Make a small change to any review file
2. Commit and push to GitHub
3. Check Actions tab to see it run
4. Check X and Bluesky for the post!

**Option B - Manual trigger:**
1. Go to GitHub → **Actions** → **Auto-Post to Social Media**
2. Click **Run workflow**
3. Select main branch → Run

## 📝 How It Works

When you push new content (or update existing):

1. GitHub Action detects `.mdx` files in `src/content/reviews/` or `src/content/technical/`
2. Script reads the frontmatter (title, rating, description)
3. Generates platform-specific posts
4. Posts simultaneously to X and Bluesky

**Example post for a review:**
```
New Review: ChatGPT-4 🔥

Rating: 9.2/10

The most capable AI assistant available. Expensive but worth it.

Full review: https://benchthebots.ai/reviews/chatgpt-4

#AITools #ChatGPT4
```

## 🎨 Customization

Edit post templates in `scripts/post-to-social.js`:
- Change hashtags
- Modify emoji usage
- Adjust text format
- Add custom fields

## 📊 RSS Feed

Your RSS feed is live at:
- https://benchthebots.ai/rss.xml

Use this for:
- Zapier/IFTTT integrations
- Email newsletters
- Other automation tools

## 🔍 Troubleshooting

**Posts not appearing?**
- Check GitHub Actions tab for errors
- Verify all secrets are set in GitHub
- Ensure Twitter app has Read/Write permissions

**Want to test locally?**
```bash
# Set environment variables first, then:
node scripts/post-to-social.js
```

**Disable automation?**
Delete or rename `.github/workflows/auto-post-social.yml`

## 📚 Full Documentation

See `SOCIAL_AUTOMATION_SETUP.md` for complete details.
