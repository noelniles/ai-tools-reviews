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
  trackEvent('conversion', {
    tool_name: data.toolName,
    network: data.affiliateNetwork,
    revenue: data.commission,
    transaction_id: `${data.toolName}-${Date.now()}`,
  });
}

// A/B Testing helpers
export interface ABTest {
  testId: string;
  variant: 'A' | 'B' | 'C';
  description: string;
}

export function getABVariant(testId: string, variants: string[] = ['A', 'B']): string {
  if (typeof window === 'undefined') return variants[0];
  
  const stored = localStorage.getItem(`ab_test_${testId}`);
  if (stored && variants.includes(stored)) return stored;
  
  const variant = variants[Math.floor(Math.random() * variants.length)];
  localStorage.setItem(`ab_test_${testId}`, variant);
  
  trackEvent('ab_test_assigned', {
    test_id: testId,
    variant: variant,
  });
  
  return variant;
}

export function trackABConversion(testId: string, variant: string, value?: number) {
  trackEvent('ab_test_conversion', {
    test_id: testId,
    variant: variant,
    value: value || 1,
  });
}

// Advanced engagement tracking
export const advancedAnalytics = {
  // Track scroll heatmap data
  trackScrollHeatmap(percentage: number, timeAtPercentage: number) {
    trackEvent('scroll_heatmap', {
      percentage,
      time_spent: timeAtPercentage,
    });
  },

  // Track click heatmap
  trackClickPosition(x: number, y: number, element: string) {
    trackEvent('click_heatmap', {
      x_position: x,
      y_position: y,
      element_type: element,
    });
  },

  // Track session duration
  trackSessionDuration(duration: number) {
    trackEvent('session_duration', {
      duration_seconds: duration,
      duration_minutes: Math.floor(duration / 60),
    });
  },

  // Track rage clicks (frustration indicator)
  trackRageClick(element: string, clickCount: number) {
    trackEvent('rage_click', {
      element,
      click_count: clickCount,
      frustration_level: clickCount > 5 ? 'high' : 'medium',
    });
  },

  // Track copy/paste events (engagement indicator)
  trackCopyContent(contentType: string, length: number) {
    trackEvent('content_copied', {
      content_type: contentType,
      length,
    });
  },

  // Track tab visibility (did user switch tabs?)
  trackTabVisibility(isVisible: boolean, awayTime?: number) {
    trackEvent('tab_visibility', {
      is_visible: isVisible,
      away_time: awayTime,
    });
  },

  // Track device and browser info
  trackDeviceInfo() {
    if (typeof window === 'undefined') return;
    
    trackEvent('device_info', {
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      user_agent: navigator.userAgent,
    });
  },
};

// Conversion funnel tracking
export class ConversionFunnel {
  private funnelId: string;
  private steps: string[];
  private currentStep: number = 0;

  constructor(funnelId: string, steps: string[]) {
    this.funnelId = funnelId;
    this.steps = steps;
  }

  enterStep(stepName: string) {
    const stepIndex = this.steps.indexOf(stepName);
    if (stepIndex !== -1) {
      this.currentStep = stepIndex;
      trackEvent('funnel_step_entered', {
        funnel_id: this.funnelId,
        step_name: stepName,
        step_index: stepIndex,
      });
    }
  }

  completeStep(stepName: string) {
    const stepIndex = this.steps.indexOf(stepName);
    trackEvent('funnel_step_completed', {
      funnel_id: this.funnelId,
      step_name: stepName,
      step_index: stepIndex,
    });
  }

  abandonFunnel(reason?: string) {
    trackEvent('funnel_abandoned', {
      funnel_id: this.funnelId,
      last_step: this.steps[this.currentStep],
      step_index: this.currentStep,
      reason: reason,
    });
  }

  completeFunnel() {
    trackEvent('funnel_completed', {
      funnel_id: this.funnelId,
      total_steps: this.steps.length,
      value: 10,
    });
  }
}

// Revenue attribution and ROI tracking
export function trackRevenueAttribution(data: {
  source: string;
  medium: string;
  campaign: string;
  revenue: number;
  toolName: string;
}) {
  trackEvent('revenue_attribution', {
    source: data.source,
    medium: data.medium,
    campaign: data.campaign,
    revenue: data.revenue,
    tool_name: data.toolName,
  });
}

// Enhanced affiliate tracking with more details
export function trackAffiliateClickDetailed(data: {
  toolName: string;
  linkType: 'primary' | 'secondary' | 'inline' | 'banner';
  position: string;
  timeOnPage: number;
  scrollDepth: number;
}) {
  trackEvent('affiliate_click_detailed', {
    tool_name: data.toolName,
    link_type: data.linkType,
    page_position: data.position,
    time_on_page: data.timeOnPage,
    scroll_depth: data.scrollDepth,
    value: 1,
  });
}
