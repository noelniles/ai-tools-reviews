# Social Media Automation Setup

This guide will help you set up automatic posting to X (Twitter) and Bluesky when you publish new reviews.

## 🎯 What It Does

- Automatically detects new content in `src/content/reviews/` and `src/content/technical/`
- Creates platform-specific posts with ratings, descriptions, and links
- Posts to X (Twitter) and Bluesky simultaneously
- Runs via GitHub Actions on every push to main

## 📋 Prerequisites

### 1. Install Required Packages

```bash
npm install --save-dev twitter-api-v2 @atproto/api
```

### 2. Get X (Twitter) API Credentials

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create a new project and app
3. Go to your app settings → "Keys and tokens"
4. Generate:
   - API Key (Consumer Key)
   - API Secret (Consumer Secret)
   - Access Token
   - Access Token Secret
5. Make sure your app has **Read and Write** permissions

### 3. Get Bluesky Credentials

- **Handle**: `zanemerrik.bsky.social` (your Bluesky username)
- **App Password**: 
  1. Go to Bluesky Settings → App Passwords
  2. Create a new app password
  3. Copy it (you won't see it again)

## 🔐 Configure GitHub Secrets

Add these secrets to your GitHub repository:

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add each of these:

### Required Secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `TWITTER_API_KEY` | X API Key (Consumer Key) | `abc123...` |
| `TWITTER_API_SECRET` | X API Secret | `xyz789...` |
| `TWITTER_ACCESS_TOKEN` | X Access Token | `123-abc...` |
| `TWITTER_ACCESS_SECRET` | X Access Token Secret | `def456...` |
| `BLUESKY_HANDLE` | Your Bluesky handle | `zanemerrik.bsky.social` |
| `BLUESKY_PASSWORD` | Bluesky app password | `your-app-password` |

## 🚀 How to Use

### Automatic Posting

Once set up, the automation runs automatically:

1. **Commit new content** to `src/content/reviews/` or `src/content/technical/`
2. **Push to GitHub** (main branch)
3. **GitHub Action triggers** and detects new files
4. **Posts are created** and published to X and Bluesky
5. **Check the Actions tab** in GitHub to see the results

### Manual Testing

To test without publishing new content:

```bash
# Run locally (make sure .env has the credentials)
node scripts/post-to-social.js

# Or trigger the GitHub Action manually
# Go to Actions → Auto-Post to Social Media → Run workflow
```

### Local .env Setup (Optional)

For local testing, create a `.env` file:

```env
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_ACCESS_TOKEN=your_token
TWITTER_ACCESS_SECRET=your_token_secret
BLUESKY_HANDLE=zanemerrik.bsky.social
BLUESKY_PASSWORD=your_app_password
SITE_URL=https://benchthebots.ai
```

**⚠️ Never commit `.env` to git!** (It's already in `.gitignore`)

## 📝 Post Format Examples

### Review Post (X/Twitter):
```
New Review: ChatGPT-4 🔥

Rating: 9.2/10

The most capable AI assistant available. Expensive but worth it for serious use.

Full review: https://benchthebots.ai/reviews/chatgpt-4

#AITools #ChatGPT4
```

### Technical Article Post:
```
New technical deep-dive: Transformer Architecture Explained

🔬 Breaking down attention mechanisms, positional encoding, and the magic behind modern LLMs

Read the full analysis: https://benchthebots.ai/technical/transformer-architecture

#AI #MachineLearning #TechDeepDive
```

## 🛠️ Customization

### Edit Post Templates

Modify `scripts/post-to-social.js`, function `createPostText()` to change:
- Post format
- Hashtags
- Emoji usage
- Text length

### Change Trigger Conditions

Edit `.github/workflows/auto-post-social.yml` to:
- Post on schedule instead of on push
- Only post for reviews (not technical articles)
- Add delays or conditions

## 🐛 Troubleshooting

### Posts not appearing?

1. Check **GitHub Actions** tab for errors
2. Verify all secrets are set correctly
3. Make sure Twitter app has **Read and Write** permissions
4. Check Bluesky app password is valid

### "Rate limit exceeded"?

- Twitter free tier: 50 tweets/day
- Add delays between posts if publishing multiple reviews

### Want to disable auto-posting temporarily?

Comment out or remove `.github/workflows/auto-post-social.yml`

## 📊 RSS Feed

Your RSS feed is available at:
- https://benchthebots.ai/rss.xml

This can also be used with Zapier, IFTTT, or other automation tools.

## 🎨 Future Enhancements

Consider adding:
- LinkedIn auto-posting
- Thread creation for longer reviews
- Image generation and attachment
- Analytics tracking for posts
- Post scheduling/queuing
