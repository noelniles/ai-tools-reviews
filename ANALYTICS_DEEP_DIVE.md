# Analytics Deep Dive Guide

How to track and understand your traffic in detail.

## Current Setup

You have Google Analytics 4 (GA4) installed. It's automatically tracking:

✅ Page views  
✅ Visitors (unique users)  
✅ Time on page  
✅ Scroll depth  
✅ Affiliate clicks  
✅ Newsletter signups  
✅ Referral sources  

## Accessing Your Analytics

### Google Analytics Dashboard

1. **Go to:** https://analytics.google.com
2. **Sign in** with your Google account
3. **Select** your property (benchthebots.ai)

### Key Reports to Check

#### 1. **Real-Time Report** (Who's on your site RIGHT NOW)
- **Path:** Reports → Real-time
- **Shows:**
  - Current active users
  - What pages they're on
  - Where they came from (source)
  - What device they're using

#### 2. **Pages and Screens** (Most popular pages)
- **Path:** Reports → Engagement → Pages and screens
- **Shows:**
  - Which pages get the most views
  - Average time on each page
  - Bounce rate per page
  - Entry/exit pages

**Filter by page to see specific content:**
```
Page path contains: /reviews/cursor-ai
Page path contains: /technical/
```

#### 3. **Traffic Acquisition** (How people find you)
- **Path:** Reports → Acquisition → Traffic acquisition
- **Shows:**
  - Organic search
  - Direct traffic
  - Referrals (from other sites)
  - Social media
  - Email campaigns

**See specific sources:**
```
google.com (organic search)
twitter.com (social)
reddit.com (referral)
benchthebots.ai (direct/bookmarks)
```

#### 4. **User Acquisition** (New vs returning visitors)
- **Path:** Reports → Acquisition → User acquisition
- **Shows:**
  - First-time visitors
  - Returning visitors
  - What brings new users
  - What brings users back

#### 5. **Events** (Track specific actions)
- **Path:** Reports → Engagement → Events
- **Shows all tracked events:**
  - `affiliate_click` - Someone clicked an affiliate link
  - `page_view` - Page loaded
  - `scroll` - How far people scroll
  - `newsletter_signup` - Email captured
  - `review_submission` - User submitted a review

**Filter by event to see details:**
```
Event name: affiliate_click
Then see parameter: tool_name (which tool they clicked)
```

## Advanced Tracking: Custom Dimensions

To get more granular data, set up custom dimensions:

### 1. Track Review Categories
**Add to GA4:**
- Dimension name: `review_category`
- Values: `llm`, `image`, `code`, `productivity`

**Purpose:** See which type of AI tools get most traffic

### 2. Track Post Age
**Add to GA4:**
- Dimension name: `post_age`
- Values: `new` (< 30 days), `recent` (30-90 days), `evergreen` (> 90 days)

**Purpose:** See if new content or evergreen content drives more traffic

### 3. Track Affiliate Links by Position
Already tracked! Check event parameter `link_position`:
- `primary` - Top CTA button
- `secondary` - Bottom CTA button

**Purpose:** Know which button placement converts better

## Better UTM Tracking

Add UTM parameters to your social media posts and email campaigns.

### UTM Format

```
https://benchthebots.ai/reviews/cursor-ai?utm_source=twitter&utm_medium=social&utm_campaign=cursor_launch
```

**Parameters:**
- `utm_source` - Where traffic came from (twitter, newsletter, reddit)
- `utm_medium` - Type of link (social, email, referral)
- `utm_campaign` - Specific campaign (cursor_launch, cost_tracking_post)

### Example Social Post Links

**Twitter post about Cursor:**
```
https://benchthebots.ai/reviews/cursor-ai?utm_source=twitter&utm_medium=social&utm_campaign=cursor_review
```

**Newsletter link:**
```
https://benchthebots.ai/technical/agentic-design-patterns?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest
```

**Reddit comment:**
```
https://benchthebots.ai/technical/mmlu-benchmark-explained?utm_source=reddit&utm_medium=comment&utm_campaign=r_machinelearning
```

Then you can see in GA4 exactly which posts drove traffic!

## Specific Questions You Can Answer

### "Who's on what page?"
1. Go to **Reports → Real-time**
2. See "Views by page title and screen name"
3. Shows current active users on each page

### "When do people visit?"
1. Go to **Reports → Engagement → Pages and screens**
2. Click any page
3. Add secondary dimension: "Hour" or "Day of week"
4. See when that page gets most traffic

### "How did they get there?"
1. Go to **Reports → Engagement → Pages and screens**
2. Click a specific page
3. Add secondary dimension: "Session source/medium"
4. See all traffic sources for that page

**Example:**
```
Page: /reviews/claude-3
Sources:
- google / organic (50%)
- twitter.com / referral (25%)
- (direct) / (none) (15%)
- reddit.com / referral (10%)
```

### "Which content drives affiliate clicks?"
1. Go to **Reports → Engagement → Events**
2. Filter event name: `affiliate_click`
3. Add dimension: `page_location` or `tool_name`
4. See which pages/tools generate most clicks

## Tracking Improvements to Add

### 1. Add Google Search Console

Connect Google Search Console to GA4 for search query data.

**Setup:**
1. Go to https://search.google.com/search-console
2. Add property: benchthebots.ai
3. Verify ownership (add HTML file to /public/)
4. Link to GA4 in settings

**What you get:**
- Exact search queries that bring people
- Click-through rates from Google
- Average ranking positions
- Impressions vs clicks

### 2. Add Heatmaps (Optional)

Services like Hotjar or Microsoft Clarity show:
- Where users click
- How they scroll
- Rage clicks (frustrated users)
- Session recordings

**Microsoft Clarity:**
- Free forever
- Easy setup (one script tag)
- GDPR compliant
- Get at: https://clarity.microsoft.com

### 3. Track Outbound Link Clicks

Currently tracked for affiliate links. To track ALL external links:

Add to `analytics.ts`:
```javascript
// Track all external link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.href && !link.href.startsWith(window.location.origin)) {
    gtag('event', 'outbound_click', {
      link_url: link.href,
      link_text: link.textContent
    });
  }
});
```

### 4. Track Reading Progress

Already have scroll depth tracking! To see it:
1. Go to **Reports → Engagement → Events**
2. Look for `scroll` events
3. Check parameter `percent_scrolled`

Shows: Did people read 25%, 50%, 75%, 90% of the article?

## Weekly Analytics Routine

**Every Monday morning:**

1. **Check top pages** (last 7 days)
   - Which content performed best?
   - Any surprises?

2. **Check traffic sources**
   - Where is growth coming from?
   - What's working?

3. **Check affiliate clicks**
   - Which tools drove clicks?
   - Which pages converted best?

4. **Check new vs returning**
   - Growing audience?
   - Building loyalty?

5. **Set goals for the week**
   - "Get 1000 views on cost tracking post"
   - "Get 50 affiliate clicks"

## Export Data for Analysis

**Download reports:**
1. Open any report in GA4
2. Click "Share" icon (top right)
3. Choose "Download file"
4. Pick format: PDF, CSV, or Google Sheets

**Use for:**
- Monthly traffic reports
- Content performance analysis
- Identifying trends over time

## Privacy & Compliance

Your current setup:
✅ Anonymize IP addresses (GDPR compliant)
✅ No personally identifiable information collected
✅ Cookie consent not legally required (but recommended)

**To add cookie banner (optional):**
- Use a service like Cookiebot or Cookie Notice
- Or create a simple banner in Astro

## Quick Wins

**This week:**

1. **Set up Google Search Console** (30 min)
   - See what keywords bring traffic
   - Optimize for high-impression, low-click queries

2. **Add UTM parameters to social posts** (5 min per post)
   - Know which tweets/posts drive traffic
   - Double down on what works

3. **Check your top 10 pages** (10 min)
   - Are they monetized with affiliate links?
   - Do they have clear CTAs?
   - Any quick wins to improve conversion?

4. **Review affiliate click events** (5 min)
   - Which tools get clicks but no conversions?
   - Which pages drive most clicks?
   - Optimize those pages first

## Resources

- **GA4 Documentation:** https://support.google.com/analytics/
- **GA4 YouTube Tutorials:** Search "Google Analytics 4 for beginners"
- **Your Analytics:** https://analytics.google.com
- **UTM Builder:** https://ga-dev-tools.google/campaign-url-builder/

---

**Bottom line:** You already have solid tracking. Now you just need to:
1. Check your GA4 dashboard regularly
2. Use UTM parameters in social posts
3. Connect Google Search Console
4. Review data weekly to optimize content

The data's already flowing. Time to use it!
