#!/bin/bash
# Setup script for ai-tools-testing repository

echo "🚀 Setting up ai-tools-testing repository..."

# Prompt for organization name
read -p "Enter your GitHub organization name: " ORG_NAME

# Clone the repository
echo "📦 Cloning repository..."
cd /home/me/git
git clone "git@github.com:${ORG_NAME}/ai-tools-testing.git"
cd ai-tools-testing

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p benchmarks/llm
mkdir -p benchmarks/image
mkdir -p benchmarks/code
mkdir -p benchmarks/audio
mkdir -p detection/watermarks
mkdir -p detection/fingerprinting
mkdir -p detection/hallucination
mkdir -p analysis/statistical
mkdir -p analysis/visualization
mkdir -p analysis/reporting
mkdir -p datasets/prompts
mkdir -p datasets/reference_outputs
mkdir -p utils/api_clients
mkdir -p tests
mkdir -p scripts
mkdir -p docs
mkdir -p results

# Create .gitignore
echo "📝 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
env/
ENV/
.venv

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Environment variables
.env
.env.local

# Results (don't commit test outputs)
results/*
!results/.gitkeep

# Cache
cache/
.cache/
*.cache

# API keys
*_key.txt
*_secret.txt
credentials.json

# OS
.DS_Store
Thumbs.db

# Jupyter
.ipynb_checkpoints/
*.ipynb

# Testing
.pytest_cache/
.coverage
htmlcov/
EOF

# Create results/.gitkeep to preserve directory
touch results/.gitkeep

echo "✅ Directory structure created!"
echo ""
echo "Next steps:"
echo "1. Run: cd /home/me/git/ai-tools-testing"
echo "2. We'll create the first benchmark tool"
echo ""
