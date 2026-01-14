/**
 * Analytics and Tracking Configuration
 * 
 * This file centralizes all analytics tracking for better maintainability
 * and makes it easy to swap analytics providers if needed.
 */

// Environment variables - set these in your .env file or hosting platform
export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  googleAnalyticsId: import.meta.env.PUBLIC_GA_ID || 'G-XXXXXXXXXX',
  
  // Plausible Analytics (privacy-focused alternative)
  plausibleDomain: import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || '',
  
  // Fathom Analytics (privacy-focused alternative)
  fathomSiteId: import.meta.env.PUBLIC_FATHOM_SITE_ID || '',
  
  // Enable debug mode in development
  debug: import.meta.env.DEV || false,
};

// Event tracking helper
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (ANALYTICS_CONFIG.debug) {
    console.log('[Analytics]', eventName, params);
  }

  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }

  // Plausible
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props: params });
  }

  // Fathom
  if (typeof window !== 'undefined' && (window as any).fathom) {
    (window as any).fathom.trackEvent(eventName, params);
  }
}

// Common event tracking functions
export const analytics = {
  // Page views (handled automatically by GA4, but useful for custom analytics)
  trackPageView(path: string) {
    trackEvent('page_view', { page_path: path });
  },

  // Affiliate link clicks
  trackAffiliateClick(toolName: string, linkType: 'primary' | 'secondary' = 'primary') {
    trackEvent('affiliate_click', {
      tool_name: toolName,
      link_type: linkType,
      value: 1, // Can be used for conversion value estimation
    });
  },

  // Review interactions
  trackReviewView(toolName: string, rating: number) {
    trackEvent('review_view', {
      tool_name: toolName,
      rating: rating,
    });
  },

  // User engagement
  trackEngagement(action: string, label?: string, value?: number) {
    trackEvent('engagement', {
      action,
      label,
      value,
    });
  },

  // Newsletter signup
  trackNewsletterSignup(location: 'footer' | 'popup' | 'article') {
    trackEvent('newsletter_signup', {
      location,
      value: 5, // Assign value to newsletter signups
    });
  },

  // Comparison tool usage
  trackComparison(toolsCompared: string[]) {
    trackEvent('comparison_view', {
      tools: toolsCompared.join(','),
      tool_count: toolsCompared.length,
    });
  },

  // Search usage
  trackSearch(query: string, resultsCount: number) {
    trackEvent('search', {
      search_term: query,
      results_count: resultsCount,
    });
  },

  // User review submission
  trackReviewSubmission(toolName: string, rating: number) {
    trackEvent('review_submitted', {
      tool_name: toolName,
      rating: rating,
      value: 10, // High value event
    });
  },

  // Outbound link clicks (non-affiliate)
  trackOutboundLink(url: string, label?: string) {
    trackEvent('outbound_link', {
      url,
      label,
    });
  },

  // Time on page (for engagement tracking)
  trackTimeOnPage(seconds: number, pageType: 'review' | 'comparison' | 'home' | 'other') {
    trackEvent('time_on_page', {
      page_type: pageType,
      duration: seconds,
    });
  },

  // Scroll depth
  trackScrollDepth(percentage: number, page: string) {
    trackEvent('scroll_depth', {
      percentage,
      page,
    });
  },
};

// Affiliate link tracking middleware
export function createAffiliateLink(url: string, toolName: string, params?: Record<string, string>) {
  // Add tracking parameters to affiliate links
  const urlObj = new URL(url);
  
  // Add UTM parameters for better tracking
  urlObj.searchParams.set('utm_source', 'aitoolsreviews');
  urlObj.searchParams.set('utm_medium', 'affiliate');
  urlObj.searchParams.set('utm_campaign', toolName.toLowerCase().replace(/\s+/g, '-'));
  
  // Add any additional parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
  }
  
  return urlObj.toString();
}

// Revenue attribution helper
export interface ConversionData {
  toolName: string;
  affiliateNetwork?: 'impact' | 'cj' | 'direct' | 'amazon';
  commission?: number;
  conversionDate: Date;
}

export function trackConversion(data: ConversionData) {
  // This would be called from a webhook or postback URL
  // when an affiliate network reports a conversion
  trackEvent('conversion', {
    tool_name: data.toolName,
    network: data.affiliateNetwork,
    revenue: data.commission,
    transaction_id: `${data.toolName}-${Date.now()}`,
  });
}
