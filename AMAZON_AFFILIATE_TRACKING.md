# Amazon Affiliate Tracking Guide

## Overview

Track your Amazon affiliate performance to understand which products and pages drive the most revenue.

## Amazon Associates Dashboard

### Accessing Your Reports

1. Go to [Amazon Associates Central](https://affiliate-program.amazon.com)
2. Sign in with your Amazon account
3. Navigate to **Reports** in the top menu

### Key Reports

#### 1. **Earnings Report** (Most Important)
- **Path:** Reports > Earnings
- **Shows:**
  - Total clicks on your affiliate links
  - Items shipped (conversions)
  - Conversion rate
  - Earnings by day/week/month
  - Revenue per click

#### 2. **Link Performance Report**
- **Path:** Reports > Link Performance
- **Shows:**
  - Which specific products were clicked
  - Which products generated orders
  - Revenue per product
  - Conversion rates per product

#### 3. **Tracking ID Report**
- **Path:** Reports > Tracking ID Summary
- **Shows:**
  - Performance by tracking ID
  - Use different IDs for different pages to track which content performs best

## Tracking Strategy

### Use Different Tracking IDs for Different Pages

Your main tracking ID: `benchthebots-20`

Create additional sub-IDs to track performance by page:

```
benchthebots-20        # Main ID (default)
benchthebots-books-20  # Books page
benchthebots-hardware-20  # Hardware recommendations
benchthebots-deals-20  # Deals page
benchthebots-review-20  # Individual review pages
```

**How to create sub-IDs:**
1. Go to Amazon Associates dashboard
2. Click **Tracking ID** in top menu
3. Click **Manage Your Tracking IDs**
4. Add new IDs for each category

**Update your code:**

```typescript
// In /src/pages/resources.astro
const amazonId = 'benchthebots-books-20';  // For books

// In /src/pages/deals.astro
const amazonId = 'benchthebots-deals-20';  // For deals
```

### Track in Google Analytics

Your site already tracks affiliate clicks with:

```javascript
// Event: affiliate_click_detailed
{
  tool_name: 'Amazon - AI Books',
  link_type: 'primary',
  page_position: 'resources-page',
  time_on_page: 45
}
```

**View in GA4:**
1. Go to Google Analytics
2. Navigate to **Reports > Engagement > Events**
3. Search for `affiliate_click`
4. See which pages/products get most clicks

## Understanding Amazon Metrics

### Key Metrics

| Metric | What It Means | Good Target |
|--------|---------------|-------------|
| **Clicks** | Users clicked your Amazon links | 100+/month |
| **Conversion Rate** | % of clicks that become orders | 3-10% |
| **Items Shipped** | Actual purchases | 5-20/month |
| **Earnings** | Your commission | Varies by product |
| **Revenue/Click** | Average value per click | $0.10-$1.00 |

### Commission Rates

Amazon commissions vary by category:

- **Books:** 4.5%
- **Electronics:** 2.5%
- **PC Components:** 2.5%
- **Amazon Devices:** 4%
- **Luxury Beauty:** 10%
- **Digital Content:** 5%

## Optimization Tips

### 1. Focus on High-Converting Products

Check your Link Performance Report monthly:
- Which books get the most clicks?
- Which hardware items convert best?
- Remove low-performers, add similar successful products

### 2. Place Links Strategically

Based on your analytics:
- **Above the fold** = Higher click-through rate
- **After valuable content** = Better conversion rate
- **Multiple CTAs** = More opportunities to click

### 3. Use Product Images

You've already done this - product images increase clicks by 30-50% vs text-only links.

### 4. Seasonal Optimization

- **Black Friday/Cyber Monday** - Promote deals heavily
- **Back to School** - Hardware for students
- **New Year** - Learning resources, productivity tools
- **Prime Day** - Special promotions

## Connecting Amazon Data to Google Analytics

### Manual Correlation

1. **Check GA4:** See affiliate clicks by day
2. **Check Amazon:** See orders/revenue by day
3. **Calculate:** Revenue / Clicks = Revenue per click
4. **Identify:** Which days/pages performed best

### Example Analysis

```
Date: Jan 20, 2026
GA4 Affiliate Clicks: 45 (resources page)
Amazon Orders: 3
Amazon Revenue: $15.67
Conversion Rate: 6.7%
Revenue/Click: $0.35
```

### Advanced: Use Amazon's API (Optional)

Amazon Product Advertising API allows:
- Real-time price updates
- Automated product data
- Inventory checks
- Review ratings

**Setup:**
1. Apply for API access in Associates Central
2. Get API credentials
3. Integrate with your site (requires backend)

## Monthly Review Checklist

### Week 1: Data Collection
- [ ] Export Amazon earnings report
- [ ] Check GA4 affiliate click events
- [ ] Note top-performing pages
- [ ] Identify best-converting products

### Week 2: Analysis
- [ ] Calculate conversion rates by page
- [ ] Compare month-over-month growth
- [ ] Identify underperforming content
- [ ] Check for broken/outdated links

### Week 3: Optimization
- [ ] Replace low-performing products
- [ ] Add new products based on trends
- [ ] Update product descriptions
- [ ] Test new call-to-action placements

### Week 4: Planning
- [ ] Set goals for next month
- [ ] Plan new content for high-converters
- [ ] Research trending products to add
- [ ] Update seasonal recommendations

## Red Flags to Watch

### Low Conversion Rate (<2%)
**Possible causes:**
- Wrong audience (people aren't buyers)
- Price point too high
- Product not aligned with content
- Broken checkout experience

**Solutions:**
- Review product selection
- Add more budget-friendly options
- Ensure product matches user intent
- Test purchase flow yourself

### High Clicks, No Sales
**Possible causes:**
- Users comparison shopping (clicking but buying elsewhere)
- Prices higher than competitors
- Reviews mention better alternatives
- Cart abandonment issues

**Solutions:**
- Add comparison tables
- Mention price competitiveness
- Highlight Amazon benefits (Prime, returns)
- Include customer review snippets

### Declining Click-Through Rate
**Possible causes:**
- Link fatigue (same products too long)
- Better alternatives available
- Outdated recommendations
- Poor content quality

**Solutions:**
- Refresh product listings monthly
- Add new releases
- Update with current prices/specs
- Improve content around products

## Tax & Payment

### Getting Paid

- **Minimum threshold:** $10 for direct deposit, $100 for check
- **Payment schedule:** ~60 days after end of month
- **Methods:** Direct deposit, check, Amazon gift card

### Tax Reporting

- Amazon sends **1099-MISC** if you earn $600+ per year
- Report as business income
- Track expenses (domain, hosting, tools)
- Consider LLC for liability protection

### Legal Requirements

Add to your site (you already have this):
- Affiliate disclosure
- Privacy policy
- Cookie consent (if in EU)
- Terms of service

## Tools for Tracking

### Recommended Tools

1. **Google Sheets** (Free)
   - Track clicks, revenue, conversion rates
   - Create monthly dashboards
   - Calculate ROI

2. **Looker Studio** (Free)
   - Connect GA4 data
   - Create visual dashboards
   - Auto-update reports

3. **Geniuslink** ($10-49/month)
   - Auto-localize Amazon links (US, UK, CA, etc.)
   - Built-in analytics
   - Link health monitoring

4. **ThirstyAffiliates** (WordPress plugin)
   - Link management
   - Click tracking
   - A/B testing

## Success Benchmarks

### Month 1-3 (Building)
- 50+ affiliate clicks/month
- 1-3% conversion rate
- $10-50 earnings/month

### Month 4-6 (Growing)
- 200+ affiliate clicks/month
- 3-5% conversion rate
- $50-200 earnings/month

### Month 7-12 (Scaling)
- 500+ affiliate clicks/month
- 5-8% conversion rate
- $200-1000 earnings/month

### Year 2+ (Established)
- 1000+ affiliate clicks/month
- 8-10% conversion rate
- $1000-5000 earnings/month

## Troubleshooting

### "Can't see my clicks in Amazon"
- Cookies may be blocked
- Wait 24-48 hours for data
- Check tracking ID is correct
- Verify links are properly formatted

### "Clicks but no conversions"
- Normal if traffic is low (<100 clicks/month)
- May take time for users to decide
- 24-hour cookie window (user must buy within 24h)
- Check product prices aren't inflated

### "Account suspended"
- Must have 3 sales in first 180 days
- Keep content updated
- Don't click own links
- Follow Amazon Associates rules

## Next Steps

1. **Set up tracking IDs** for different pages
2. **Schedule monthly reviews** - First Monday of each month
3. **Create spreadsheet** to track monthly performance
4. **Set targets** - Start with $50/month, grow 20% monthly
5. **Optimize** based on data, not guesses
