#!/bin/bash

# Simple Asset Generation Script
# Uses ImageMagick (convert command) to generate PNG assets from SVG templates
#
# Install ImageMagick:
# - macOS: brew install imagemagick
# - Ubuntu/Debian: sudo apt-get install imagemagick
# - Windows: https://imagemagick.org/script/download.php

echo "🎨 Generating visual assets..."
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found!"
    echo ""
    echo "Install ImageMagick:"
    echo "  macOS:   brew install imagemagick"
    echo "  Ubuntu:  sudo apt-get install imagemagick"
    echo "  Windows: https://imagemagick.org/script/download.php"
    echo ""
    echo "Or use the online method:"
    echo "  1. Go to https://cloudconvert.com/svg-to-png"
    echo "  2. Upload public/og-image-template.svg"
    echo "  3. Download as og-image.png"
    exit 1
fi

cd "$(dirname "$0")/../public"

# Generate OG Image (1200x630)
echo "📷 Converting OG image template to PNG..."
convert og-image-template.svg -resize 1200x630 og-image.png
echo "✅ Created: og-image.png"

# Generate Apple Touch Icon (180x180)
echo ""
echo "🍎 Converting favicon to Apple Touch Icon..."
convert favicon.svg -resize 180x180 -background none apple-touch-icon.png
echo "✅ Created: apple-touch-icon.png"

# Generate additional sizes (optional)
echo ""
echo "📱 Generating additional icon sizes..."
convert favicon.svg -resize 192x192 -background none icon-192.png
echo "✅ Created: icon-192.png"

convert favicon.svg -resize 512x512 -background none icon-512.png
echo "✅ Created: icon-512.png"

echo ""
echo "✨ All assets generated successfully!"
echo ""
echo "📋 Assets created:"
echo "  - og-image.png (1200x630) - For social sharing"
echo "  - apple-touch-icon.png (180x180) - For iOS"
echo "  - icon-192.png (192x192) - For Android"
echo "  - icon-512.png (512x512) - For Android"
echo ""
echo "🧪 Next steps:"
echo "  1. Review images in /public/"
echo "  2. Test OG image: https://developers.facebook.com/tools/debug/"
echo "  3. Deploy!"
