# Push to GitHub - Quick Guide

Your code is committed and ready. Here are 3 ways to push:

## Option 1: Using GitHub CLI (Easiest)

```bash
cd /root/portfolio-website
gh auth login
# Follow the prompts to authenticate
gh repo create navyapdh11/portfolio-website --public --source=. --push
```

## Option 2: Using Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Create a new token with `repo` scope
3. Run:

```bash
cd /root/portfolio-website
git push -u origin main
# Username: navyapdh11
# Password: <your_token_here>
```

## Option 3: Create Repo Manually

1. Go to https://github.com/new
2. Create repository: `portfolio-website`
3. Make it Public
4. Then run:

```bash
cd /root/portfolio-website
git push -u origin main
```

## After First Push

For future updates:

```bash
cd /root/portfolio-website
git add -A
git commit -m "your message"
git push
```

## Repository URL

Once pushed, your repo will be at:
https://github.com/navyapdh11/portfolio-website
