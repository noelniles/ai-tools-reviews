# User Review Submission System

## Overview
This site now accepts community reviews through `/submit-review`. Reviews are submitted via form and require human verification (reCAPTCHA v3).

## Setup Instructions

### 1. Form Backend (Choose One)

#### Option A: Formspree (Easiest - Recommended)
1. Sign up at https://formspree.io
2. Create a new form endpoint
3. Replace `YOUR_FORM_ID` in `/src/pages/submit-review.astro` line 170
4. Formspree will email you when reviews are submitted
5. Free tier: 50 submissions/month

#### Option B: Basin.io
1. Sign up at https://usebasin.com
2. Create a new form
3. Replace the endpoint URL in submit-review.astro
4. Free tier: 100 submissions/month

#### Option C: Custom Backend (For developers)
Build a simple API endpoint that:
- Accepts POST requests with review data
- Stores in database (MongoDB, PostgreSQL, etc.)
- Sends email notification
- Returns success/error status

Example schema:
```json
{
  "toolName": "string",
  "overallRating": "number (1-5)",
  "useDuration": "string",
  "useCase": "string",
  "reviewTitle": "string",
  "reviewText": "string (min 100 chars)",
  "pros": "string",
  "cons": "string",
  "recommend": "yes|maybe|no",
  "userName": "string (optional)",
  "userRole": "string (optional)",
  "userEmail": "string (optional)",
  "submittedAt": "ISO timestamp",
  "userAgent": "string",
  "status": "pending|approved|rejected"
}
```

### 2. Google reCAPTCHA v3
1. Sign up at https://www.google.com/recaptcha/admin
2. Choose reCAPTCHA v3
3. Add your domain
4. Get Site Key and Secret Key
5. Add to submit-review.astro:

```html
<!-- In <head> -->
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>

<!-- Before form submission -->
<script>
grecaptcha.ready(function() {
  grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'}).then(function(token) {
    // Add token to form data
    data.recaptchaToken = token;
  });
});
</script>
```

Server-side verification (backend):
```javascript
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  body: `secret=YOUR_SECRET_KEY&response=${token}`
});
const data = await response.json();
if (data.success && data.score > 0.5) {
  // Process review
}
```

### 3. Review Moderation Workflow

#### Manual Approach
1. Receive email notification from form service
2. Review submission for:
   - Spam/bot content
   - Profanity or inappropriate language
   - Genuine experience vs fake review
3. If approved, manually create MDX file in `/src/content/reviews/user-reviews/`
4. Include attribution: "Submitted by [Display Name]"

#### Semi-Automated (Recommended)
Build admin dashboard:
- List pending reviews
- Preview rendered review
- Approve/Reject buttons
- Auto-generate MDX file on approval
- Track review stats (submissions, approvals, etc.)

#### Tools for Moderation Dashboard
- **Astro DB** (free tier): Store submissions
- **GitHub Actions**: Auto-create PR with new review MDX
- **Netlify Functions**: Serverless API for approvals
- **Google Sheets**: Simple review queue (via Zapier/Make)

### 4. Displaying User Reviews

Create a new collection for user-submitted reviews:

```typescript
// src/content/config.ts
const userReviews = defineCollection({
  type: 'content',
  schema: z.object({
    toolName: z.string(),
    rating: z.number(),
    title: z.string(),
    author: z.string().optional(),
    authorRole: z.string().optional(),
    date: z.string(),
    recommend: z.enum(['yes', 'maybe', 'no']),
    useDuration: z.string().optional(),
    verified: z.boolean().default(false)
  })
});

export const collections = { reviews, 'user-reviews': userReviews };
```

Display on tool pages:
- Show official review at top
- List community reviews below
- Filter/sort by rating, date, helpfulness
- Add "Was this helpful?" voting

### 5. Anti-Spam Measures

Already implemented:
- ✅ reCAPTCHA v3 (invisible)
- ✅ Manual moderation queue
- ✅ Minimum review length (100 chars)
- ✅ Required rating selection

Consider adding:
- IP rate limiting (1 review per IP per day)
- Email verification link before submission
- Honeypot fields (hidden inputs bots will fill)
- User agent fingerprinting
- Time-based analysis (too fast = bot)

### 6. Incentivizing Quality Reviews

Gamification ideas:
- Badge system (Contributor, Expert, Top Reviewer)
- Display review count on user profile
- Feature "Review of the Week" on homepage
- Send thank-you email with badge image
- Leaderboard of top contributors

## Testing the Form

1. Start dev server: `npm run dev`
2. Navigate to http://localhost:4321/submit-review
3. Fill out form completely
4. Check console for submission data
5. Verify form service receives data

## Deployment Notes

- Update form endpoint before deploying
- Add reCAPTCHA keys as environment variables
- Test form on production domain
- Set up email notifications for new submissions
- Create moderation process documentation

## Future Enhancements

- **AI-assisted moderation**: Use GPT-4 to flag suspicious reviews
- **Review responses**: Let tool makers respond to reviews
- **Helpful votes**: Community voting on review quality
- **Review updates**: Allow users to update their reviews
- **Multi-tool reviews**: Compare multiple tools in one review
- **Screenshots**: Allow image uploads (use Cloudinary/Uploadcare)
- **Video reviews**: Embed YouTube/Loom videos
