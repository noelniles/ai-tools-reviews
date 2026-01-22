#!/usr/bin/env node

/**
 * Auto-post to X (Twitter) and Bluesky when new content is published
 * Triggered by GitHub Actions on new commits to content folder
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment variables
const SITE_URL = process.env.SITE_URL || 'https://benchthebots.ai';
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET;
const BLUESKY_HANDLE = process.env.BLUESKY_HANDLE;
const BLUESKY_PASSWORD = process.env.BLUESKY_PASSWORD;

/**
 * Get newly added or modified content files
 */
function getNewContentFiles() {
  try {
    const output = execSync('git diff --name-only HEAD~1 HEAD').toString();
    const files = output
      .split('\n')
      .filter(file => file.match(/src\/content\/(reviews|technical)\/.*\.mdx?$/));
    return files;
  } catch (error) {
    console.error('Error getting new files:', error);
    return [];
  }
}

/**
 * Get the most recent content file (for manual testing)
 */
function getMostRecentContentFile() {
  try {
    const output = execSync('find src/content/reviews src/content/technical -name "*.mdx" -o -name "*.md" | head -1').toString();
    return output.trim() ? [output.trim()] : [];
  } catch (error) {
    console.error('Error finding recent files:', error);
    return [];
  }
}

/**
 * Parse frontmatter from MDX file
 */
function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = value;
    }
  }
  
  return frontmatter;
}

/**
 * Create post text for social media
 */
function createPostText(frontmatter, slug, type = 'review', platform = 'twitter') {
  const title = frontmatter.title;
  const tool = frontmatter.tool || title;
  const rating = frontmatter.rating;
  const url = `${SITE_URL}/${type === 'technical' ? 'technical' : 'reviews'}/${slug}`;
  
  if (type === 'technical') {
    // Technical article post
    if (platform === 'bluesky') {
      // Bluesky: Keep it short (300 char limit)
      return `New: ${title}

${url}

#AI #MachineLearning`;
    } else {
      // Twitter: More detail allowed
      return `New technical deep-dive: ${title}

🔬 ${frontmatter.description || 'Breaking down the tech behind AI tools'}

Read the full analysis: ${url}

#AI #MachineLearning #TechDeepDive`;
    }
  } else {
    // Review post
    const ratingEmoji = rating >= 8.5 ? '🔥' : rating >= 7 ? '👍' : rating >= 5 ? '🤔' : '👎';
    
    if (platform === 'bluesky') {
      // Bluesky: Concise format
      return `${tool} Review ${ratingEmoji}

Rating: ${rating}/10

${url}

#AITools`;
    } else {
      // Twitter: Full format
      return `New Review: ${tool} ${ratingEmoji}

Rating: ${rating}/10

${frontmatter.description || 'Is it worth your money?'}

Full review: ${url}

#AITools #${tool.replace(/\s+/g, '')}`;
    }
  }
}

/**
 * Post to X (Twitter) using API v2
 */
async function postToTwitter(text) {
  if (!TWITTER_API_KEY || !TWITTER_ACCESS_TOKEN) {
    console.log('⚠️  Twitter credentials not configured, skipping X post');
    return false;
  }

  try {
    // Using twitter-api-v2 package
    const { TwitterApi } = await import('twitter-api-v2');
    
    const client = new TwitterApi({
      appKey: TWITTER_API_KEY,
      appSecret: TWITTER_API_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN,
      accessSecret: TWITTER_ACCESS_SECRET,
    });

    const tweet = await client.v2.tweet(text);
    console.log('✅ Posted to X (Twitter):', tweet.data.id);
    return true;
  } catch (error) {
    if (error.code === 402 || error.statusCode === 402) {
      console.log('⚠️  Twitter API requires paid plan ($100+/month). Skipping Twitter posts.');
      console.log('💡 Consider removing Twitter or using Buffer/Hootsuite instead.');
    } else {
      console.error('❌ Error posting to Twitter:', error.message);
    }
    return false;
  }
}

/**
 * Post to Bluesky using AT Protocol
 */
async function postToBluesky(text) {
  if (!BLUESKY_HANDLE || !BLUESKY_PASSWORD) {
    console.log('⚠️  Bluesky credentials not configured, skipping Bluesky post');
    console.log('💡 Set BLUESKY_HANDLE and BLUESKY_PASSWORD in GitHub Secrets');
    return false;
  }

  try {
    const { BskyAgent, RichText } = await import('@atproto/api');
    
    console.log(`🔐 Logging into Bluesky as ${BLUESKY_HANDLE}...`);
    
    const agent = new BskyAgent({ service: 'https://bsky.social' });
    await agent.login({
      identifier: BLUESKY_HANDLE,
      password: BLUESKY_PASSWORD,
    });

    const rt = new RichText({ text });
    await rt.detectFacets(agent);

    const post = await agent.post({
      text: rt.text,
      facets: rt.facets,
    });

    console.log('✅ Posted to Bluesky:', post.uri);
    return true;
  } catch (error) {
    console.error('❌ Error posting to Bluesky:', error.message);
    if (error.message.includes('Invalid identifier or password')) {
      console.log('\n💡 Bluesky troubleshooting:');
      console.log('  1. BLUESKY_HANDLE should be: zanemerrik.bsky.social (full handle)');
      console.log('  2. BLUESKY_PASSWORD should be an App Password, not your main password');
      console.log('  3. Generate new app password: Bluesky → Settings → App Passwords');
    }
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🤖 Checking for new content to post...\n');
  
  let newFiles = getNewContentFiles();
  
  if (newFiles.length === 0) {
    console.log('ℹ️  No new content files found via git diff');
    console.log('📝 Using most recent content file for testing...\n');
    newFiles = getMostRecentContentFile();
  }
  
  if (newFiles.length === 0) {
    console.log('ℹ️  No content files found at all');
    return;
  }

  console.log(`📝 Found ${newFiles.length} file(s):\n${newFiles.join('\n')}\n`);

  for (const file of newFiles) {
    console.log(`\n📄 Processing: ${file}`);
    
    const frontmatter = parseFrontmatter(file);
    if (!frontmatter) {
      console.log('⚠️  Could not parse frontmatter, skipping');
      continue;
    }

    const slug = path.basename(file, path.extname(file));
    const type = file.includes('/technical/') ? 'technical' : 'review';
    const twitterText = createPostText(frontmatter, slug, type, 'twitter');
    const blueskyText = createPostText(frontmatter, slug, type, 'bluesky');

    console.log('\n📱 Post text (Twitter):');
    console.log('─'.repeat(50));
    console.log(twitterText);
    console.log('─'.repeat(50));

    console.log('\n📱 Post text (Bluesky):');
    console.log('─'.repeat(50));
    console.log(blueskyText);
    console.log(`(${blueskyText.length} characters)`);
    console.log('─'.repeat(50));

    // Skip Twitter API (too expensive), output for manual posting
    console.log('\n🐦 Twitter/X: Post manually at https://x.com/compose/tweet');
    console.log('📋 Tweet text copied above\n');

    // Post to Bluesky only
    const blueskySuccess = await postToBluesky(blueskyText);
    
    if (blueskySuccess) {
      console.log('✅ Automation complete!');
    } else {
      console.log('⚠️  Check Bluesky credentials in GitHub Secrets');
    }
  }

  console.log('\n✨ Done!');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
