# Lighthouse Performance Optimizations

**Date**: January 25, 2026  
**Initial Performance Score**: 75/100  
**Target Improvements**: ~2000ms reduction in load time

## Changes Implemented

### 1. Added Preconnect Links (Priority: High)
**File**: `src/layouts/BaseLayout.astro`

Added early connection hints for external resources:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
```

**Expected Impact**: ~406ms savings by establishing early connections

### 2. Optimized Google Fonts Loading (Priority: High)
**Files Modified**: 
- `src/layouts/BaseLayout.astro` (added)
- `src/styles/base.css` (removed @import)

**Changes**:
- Moved Google Fonts from CSS `@import` to HTML `<link>` tag
- Added `font-display=swap` parameter for better perceived performance
- Fonts now load with proper preconnect optimization

**Before**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Merriweather:wght@300;400;700;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

**After**:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Merriweather:wght@300;400;700;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" />
```

**Expected Impact**: ~939ms savings from eliminating render-blocking @import

### 3. Deferred KaTeX CSS Loading (Priority: High)
**File**: `src/layouts/BaseLayout.astro`

Implemented async CSS loading for non-critical KaTeX stylesheet:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" 
      integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" 
      crossorigin="anonymous" 
      media="print" 
      onload="this.media='all'" />
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" /></noscript>
```

**Expected Impact**: ~845ms savings by deferring non-critical CSS

## Expected Performance Improvements

| Metric | Before | Expected After | Improvement |
|--------|--------|----------------|-------------|
| **Render-Blocking Resources** | ~2000ms | ~0ms | -2000ms |
| **First Contentful Paint** | 3.6s | ~1.5-2.0s | -1.6-2.1s |
| **Largest Contentful Paint** | 3.6s | ~2.0-2.5s | -1.1-1.6s |
| **Performance Score** | 75/100 | ~85-95/100 | +10-20 points |

## Total Estimated Savings
- **Preconnect**: 406ms
- **Font optimization**: 939ms
- **KaTeX deferral**: 845ms
- **Total**: ~2,190ms (2.2 seconds)

## Testing Instructions

1. Rebuild the site:
   ```bash
   npm run build
   ```

2. Run Lighthouse again:
   ```bash
   npx lighthouse https://benchthebots.ai --view
   ```

3. Compare metrics:
   - Check FCP should be < 2.0s (target: green)
   - Check LCP should be < 2.5s (target: green)
   - Performance score should be 85+

## Next Steps (If Needed)

### Additional Optimizations:
1. **Unused JavaScript** (~210ms potential savings)
   - Audit and code-split large bundles
   - Lazy load non-critical components

2. **Server Response Time** (~208ms potential savings)
   - Consider edge caching with Netlify
   - Optimize server-side rendering

3. **Image Optimization**
   - Use WebP/AVIF formats
   - Implement responsive images with `srcset`

4. **Critical CSS**
   - Inline critical CSS in `<head>`
   - Defer non-critical stylesheets

## Phase 2 Optimizations (Targeting 95+ Scores)

### 4. Fixed Accessibility Issues (Priority: High)
**Files Modified**: 
- `src/components/ROICalculator.astro`
- `src/components/ReviewCard.astro`

**Changes**:

#### Color Contrast Improvements
Changed `text-slate-500` to `text-slate-400` for better contrast ratio:
- **Before**: 4.06:1 (failing WCAG AA)
- **After**: 5.14:1 (passing WCAG AA)

#### Form Accessibility
Added aria-labels to all range inputs:
```html
<input type="range" id="team-size" aria-label="Team size slider from 1 to 100 people" ... />
<input type="range" id="current-spend" aria-label="Current monthly AI tool spend from $0 to $10,000" ... />
<input type="range" id="tools-count" aria-label="Number of AI tools currently using from 1 to 20" ... />
```

**Expected Impact**: Accessibility score 84 → 95+

### 5. Deferred Google Analytics (Priority: High)
**File**: `src/layouts/BaseLayout.astro`

**Changes**:
Deferred GA loading by 2 seconds after page load to eliminate blocking JavaScript:
```javascript
window.addEventListener('load', function() {
  setTimeout(function() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(script);
    // ... GA config
  }, 2000);
});
```

**Expected Impact**: 
- Reduces unused JavaScript from 57KB (39%)
- Performance score 89 → 95+
- FCP improvement of additional 200-300ms

## Combined Expected Results

| Category | Phase 1 | Phase 2 Target | Improvement |
|----------|---------|----------------|-------------|
| **Performance** | 89/100 | 95+/100 | +6 points |
| **Accessibility** | 84/100 | 95+/100 | +11 points |
| **Best Practices** | 96/100 | 96/100 | - |
| **SEO** | 100/100 | 100/100 | ✓ |

## Deployment

Changes are ready to deploy. Run:
```bash
git add .
git commit -m "perf: Lighthouse optimizations Phase 2 - accessibility & analytics defer"
git push
```

Netlify will automatically rebuild and deploy the optimized site.

## Testing After Deployment

Wait ~2 minutes for deployment, then run:
```bash
npx lighthouse https://benchthebots.ai --view
```

Expected metrics:
- **Performance**: 95+ (from 75)
- **Accessibility**: 95+ (from 84)
- **FCP**: < 2.5s (from 3.6s)
- **LCP**: < 2.5s (from 3.6s)
- **TBT**: < 50ms (from 220ms)
