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
    const output = execSync('git diff --name-only HEAD^ HEAD').toString();
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
function createPostText(frontmatter, slug, type = 'review') {
  const title = frontmatter.title;
  const tool = frontmatter.tool || title;
  const rating = frontmatter.rating;
  const url = `${SITE_URL}/${type === 'technical' ? 'technical' : 'reviews'}/${slug}`;
  
  if (type === 'technical') {
    // Technical article post
    return `New technical deep-dive: ${title}

🔬 ${frontmatter.description || 'Breaking down the tech behind AI tools'}

Read the full analysis: ${url}

#AI #MachineLearning #TechDeepDive`;
  } else {
    // Review post
    const ratingEmoji = rating >= 8.5 ? '🔥' : rating >= 7 ? '👍' : rating >= 5 ? '🤔' : '👎';
    
    return `New Review: ${tool} ${ratingEmoji}

Rating: ${rating}/10

${frontmatter.description || 'Is it worth your money?'}

Full review: ${url}

#AITools #${tool.replace(/\s+/g, '')}`;
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
    console.error('❌ Error posting to Twitter:', error.message);
    return false;
  }
}

/**
 * Post to Bluesky using AT Protocol
 */
async function postToBluesky(text) {
  if (!BLUESKY_HANDLE || !BLUESKY_PASSWORD) {
    console.log('⚠️  Bluesky credentials not configured, skipping Bluesky post');
    return false;
  }

  try {
    const { BskyAgent, RichText } = await import('@atproto/api');
    
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
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🤖 Checking for new content to post...\n');
  
  const newFiles = getNewContentFiles();
  
  if (newFiles.length === 0) {
    console.log('ℹ️  No new content files found');
    return;
  }

  console.log(`📝 Found ${newFiles.length} new file(s):\n${newFiles.join('\n')}\n`);

  for (const file of newFiles) {
    console.log(`\n📄 Processing: ${file}`);
    
    const frontmatter = parseFrontmatter(file);
    if (!frontmatter) {
      console.log('⚠️  Could not parse frontmatter, skipping');
      continue;
    }

    const slug = path.basename(file, path.extname(file));
    const type = file.includes('/technical/') ? 'technical' : 'review';
    const postText = createPostText(frontmatter, slug, type);

    console.log('\n📱 Post text:');
    console.log('─'.repeat(50));
    console.log(postText);
    console.log('─'.repeat(50));

    // Post to both platforms
    await Promise.all([
      postToTwitter(postText),
      postToBluesky(postText),
    ]);
  }

  console.log('\n✨ Done!');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
