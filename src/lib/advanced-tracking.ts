/**
 * Advanced Tracking Utilities
 * 
 * Client-side tracking scripts for enhanced analytics and engagement metrics
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (...args: any[]) => void;
    fathom?: { trackEvent: (name: string, data?: any) => void };
  }
}

export function initAdvancedTracking() {
  if (typeof window === 'undefined') return;

  // Scroll depth tracking
  let maxScrollDepth = 0;
  let scrollCheckpoints = [25, 50, 75, 90, 100];
  let reachedCheckpoints = new Set<number>();

  function trackScrollDepth() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const scrollPercent = Math.round((scrolled / documentHeight) * 100);

    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;

      scrollCheckpoints.forEach(checkpoint => {
        if (scrollPercent >= checkpoint && !reachedCheckpoints.has(checkpoint)) {
          reachedCheckpoints.add(checkpoint);
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              percentage: checkpoint,
              page: window.location.pathname,
            });
          }
        }
      });
    }
  }

  let scrollTimeout: number;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(trackScrollDepth, 150);
  });

  // Time on page tracking
  let pageStartTime = Date.now();
  let lastActiveTime = Date.now();
  let totalActiveTime = 0;
  let isActive = true;

  function updateActiveTime() {
    if (isActive) {
      const now = Date.now();
      totalActiveTime += now - lastActiveTime;
      lastActiveTime = now;
    }
  }

  // Track visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      updateActiveTime();
      isActive = false;
      if (window.gtag) {
        window.gtag('event', 'tab_hidden', {
          active_time: Math.floor(totalActiveTime / 1000),
        });
      }
    } else {
      isActive = true;
      lastActiveTime = Date.now();
    }
  });

  // Send time on page when user leaves
  window.addEventListener('beforeunload', () => {
    updateActiveTime();
    const totalTime = Math.floor(totalActiveTime / 1000);
    
    if (window.gtag && totalTime > 0) {
      window.gtag('event', 'time_on_page', {
        duration: totalTime,
        page: window.location.pathname,
      });
    }
  });

  // Exit intent tracking
  let exitIntentFired = false;
  document.addEventListener('mouseout', (e) => {
    if (!exitIntentFired && e.clientY < 0) {
      exitIntentFired = true;
      updateActiveTime();
      const totalTime = Math.floor(totalActiveTime / 1000);
      
      if (window.gtag) {
        window.gtag('event', 'exit_intent', {
          time_on_page: totalTime,
          scroll_depth: maxScrollDepth,
          page: window.location.pathname,
        });
      }

      // Trigger exit intent popup if configured
      const event = new CustomEvent('exitIntent', {
        detail: { timeOnPage: totalTime, scrollDepth: maxScrollDepth }
      });
      document.dispatchEvent(event);
    }
  });

  // Rage click detection (user frustration)
  const clickMap = new Map<Element, { count: number; lastClick: number }>();

  document.addEventListener('click', (e) => {
    const target = e.target as Element;
    const now = Date.now();
    
    if (clickMap.has(target)) {
      const data = clickMap.get(target)!;
      if (now - data.lastClick < 1000) {
        data.count++;
        data.lastClick = now;

        if (data.count >= 3 && window.gtag) {
          window.gtag('event', 'rage_click', {
            element: target.tagName,
            class: target.className,
            click_count: data.count,
          });
        }
      } else {
        data.count = 1;
        data.lastClick = now;
      }
    } else {
      clickMap.set(target, { count: 1, lastClick: now });
    }

    // Clean up old entries
    setTimeout(() => clickMap.delete(target), 5000);
  });

  // Copy text tracking
  document.addEventListener('copy', () => {
    const selection = window.getSelection()?.toString() || '';
    if (selection.length > 10 && window.gtag) {
      window.gtag('event', 'content_copied', {
        length: selection.length,
        page: window.location.pathname,
      });
    }
  });

  // Enhanced affiliate link tracking
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[data-affiliate="true"]');
    
    if (link) {
      updateActiveTime();
      const toolName = link.getAttribute('data-tool') || 'unknown';
      const linkType = link.getAttribute('data-link-type') || 'primary';
      const timeOnPage = Math.floor(totalActiveTime / 1000);

      if (window.gtag) {
        window.gtag('event', 'affiliate_click_detailed', {
          tool_name: toolName,
          link_type: linkType,
          time_on_page: timeOnPage,
          scroll_depth: maxScrollDepth,
          page: window.location.pathname,
        });
      }
    }
  });

  // Form abandonment tracking
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    let formStarted = false;
    let formFields = new Set<string>();

    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('focus', () => {
        if (!formStarted) {
          formStarted = true;
          if (window.gtag) {
            window.gtag('event', 'form_started', {
              form_id: form.id || 'unknown',
            });
          }
        }
      });

      field.addEventListener('blur', () => {
        const fieldName = (field as HTMLInputElement).name || 'unknown';
        formFields.add(fieldName);
      });
    });

    form.addEventListener('submit', () => {
      if (window.gtag) {
        window.gtag('event', 'form_submitted', {
          form_id: form.id || 'unknown',
          fields_filled: formFields.size,
        });
      }
    });
  });

  // Dead click tracking (clicks on non-interactive elements)
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('a, button, input, select, textarea, [onclick]');
    
    if (!isInteractive && window.gtag) {
      window.gtag('event', 'dead_click', {
        element: target.tagName,
        class: target.className,
        page: window.location.pathname,
      });
    }
  });

  // Device and performance info
  if (window.gtag) {
    window.gtag('event', 'device_info', {
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      connection: (navigator as any).connection?.effectiveType || 'unknown',
    });
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedTracking);
  } else {
    initAdvancedTracking();
  }
}
