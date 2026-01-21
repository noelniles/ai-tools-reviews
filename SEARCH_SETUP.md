# Search & Review Request Setup

## Overview

The search functionality allows users to find reviews and request new ones if they don't exist.

## How It Works

1. **User searches** for an AI tool (e.g., "Gemini", "coding assistant")
2. **Results display** matching reviews in real-time
3. **No results found** → User is prompted to request that review
4. **Request submitted** → Sent to your email via Formspree + tracked in analytics

## Setup Instructions

### 1. Create a Formspree Form for Review Requests

1. Go to [Formspree.io](https://formspree.io) and sign up/login
2. Create a new form called "Review Requests"
3. Copy the form ID (looks like `mxxxxxxx`)
4. Add to your `.env` file:

```bash
PUBLIC_FORMSPREE_SUGGESTIONS_ID=mxxxxxxx
```

### 2. Form Fields

The suggestion form sends:
- **tool** - The AI tool name (from search query)
- **email** - User's email (optional)
- **notes** - Additional comments (optional)
- **_subject** - Email subject: "New AI Tool Review Request"

### 3. Email Notification

You'll receive emails like:

```
Subject: New AI Tool Review Request

tool: Gemini Pro
email: user@example.com
notes: Would love to see a comparison with ChatGPT for coding tasks
```

### 4. Tracking

Review requests are also tracked in Google Analytics:
- **Event:** `review_suggestion`
- **Parameters:**
  - `tool_name`: The requested tool
  - `has_email`: Whether user provided email
  - `has_notes`: Whether user added notes

## Usage

### Accessing Search
- Navigate to `/search` 
- Click "Search" in the main navigation
- Search icon in desktop & mobile menus

### Search Features
- **Real-time filtering** - Results update as you type
- **Searches across:**
  - Review titles
  - Descriptions  
  - Tags/categories
- **Result count** - Shows "X reviews" or "X review" dynamically

### Request Flow

When no results found:

1. User sees: "We haven't reviewed '[tool name]' yet"
2. Form pre-fills with searched tool name
3. User can optionally add:
   - Email for follow-up
   - Notes about what they want to see
4. On submit → Success confirmation displays
5. Email sent to you via Formspree

## Analytics Dashboard

Track review requests in your analytics:

```javascript
// Example query for most-requested tools
SELECT tool_name, COUNT(*) as requests
FROM events
WHERE event = 'review_suggestion'
GROUP BY tool_name
ORDER BY requests DESC
```

## Prioritizing Reviews

Use the data to prioritize:

1. **Check Formspree** - See all incoming requests with full details
2. **Check Analytics** - Identify trending tool requests
3. **Community demand** - Most-requested = highest priority
4. **Follow up** - Email users when review is published (if they provided email)

## Future Enhancements

Consider adding:
- **Vote counter** - Show how many people want each tool reviewed
- **Public roadmap** - Display upcoming reviews based on requests
- **Auto-notify** - Email requesters when review is published
- **Duplicate detection** - Group similar requests (e.g., "GPT-4" vs "ChatGPT 4")

## Troubleshooting

### Form not submitting
- Check `.env` has `PUBLIC_FORMSPREE_SUGGESTIONS_ID` set
- Verify Formspree form ID is correct
- Check browser console for errors

### Not receiving emails
- Verify email address in Formspree dashboard
- Check spam folder
- Ensure Formspree form is active (not paused)

### Analytics not tracking
- Confirm Google Analytics is set up
- Check `PUBLIC_GOOGLE_ANALYTICS_ID` in `.env`
- Open browser console and verify `gtag` is defined

## Cost

- **Formspree Free Tier:** 50 submissions/month
- **Formspree Paid:** $10/month for 1,000 submissions
- **Analytics:** Free with Google Analytics 4

## Example Review Request Email

```
From: submissions@formspree.io
To: your@email.com
Subject: New AI Tool Review Request

A new review request was submitted:

Tool: Perplexity AI
Email: sarah@example.com
Notes: I'd love to see how it compares to ChatGPT for research tasks. 
Especially interested in citation accuracy and source quality.

---
Submitted from: https://aitoolsreviews.com/search
IP: 192.168.1.1
Timestamp: 2026-01-20 17:08:42 UTC
```
