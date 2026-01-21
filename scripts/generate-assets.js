/**
 * Generate Visual Assets Script
 * Converts SVG templates to PNG assets for the site
 * 
 * Usage: node scripts/generate-assets.js
 * 
 * Requirements: Install sharp
 * npm install --save-dev sharp
 */

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function generateAssets() {
  console.log('🎨 Generating visual assets...\n');

  try {
    // 1. Generate OG Image (1200x630)
    console.log('📷 Converting OG image template to PNG...');
    const ogTemplate = join(publicDir, 'og-image-template.svg');
    const ogOutput = join(publicDir, 'og-image.png');
    
    await sharp(ogTemplate)
      .resize(1200, 630)
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(ogOutput);
    
    console.log(`✅ Created: ${ogOutput}`);

    // 2. Generate Apple Touch Icon (180x180)
    console.log('\n🍎 Converting favicon to Apple Touch Icon...');
    const faviconSvg = join(publicDir, 'favicon.svg');
    const appleIcon = join(publicDir, 'apple-touch-icon.png');
    
    await sharp(faviconSvg)
      .resize(180, 180)
      .png({ quality: 90 })
      .toFile(appleIcon);
    
    console.log(`✅ Created: ${appleIcon}`);

    // 3. Generate additional icon sizes (optional)
    console.log('\n📱 Generating additional icon sizes...');
    
    // 192x192 for Android
    await sharp(faviconSvg)
      .resize(192, 192)
      .png()
      .toFile(join(publicDir, 'icon-192.png'));
    console.log('✅ Created: icon-192.png');

    // 512x512 for Android
    await sharp(faviconSvg)
      .resize(512, 512)
      .png()
      .toFile(join(publicDir, 'icon-512.png'));
    console.log('✅ Created: icon-512.png');

    console.log('\n✨ All assets generated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the generated images in /public/');
    console.log('2. Test the OG image: https://developers.facebook.com/tools/debug/');
    console.log('3. Deploy your site');

  } catch (error) {
    console.error('❌ Error generating assets:', error.message);
    
    if (error.message.includes('sharp')) {
      console.log('\n💡 Install sharp with: npm install --save-dev sharp');
    }
    
    process.exit(1);
  }
}

generateAssets();
