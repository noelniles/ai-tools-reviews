/**
 * SEO Utilities and Helpers
 * Generate optimized meta tags, structured data, and more
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generate review-specific keywords
 */
export function generateReviewKeywords(toolName: string, category: string): string[] {
  const baseKeywords = [
    `${toolName} review`,
    `${toolName} pricing`,
    `${toolName} features`,
    `${toolName} vs alternatives`,
    `${category} tools`,
    `best ${category} AI`,
    `AI tool comparison`,
    `AI tools review`
  ];
  
  return baseKeywords;
}

/**
 * Generate structured data for review pages
 */
export function generateReviewStructuredData(data: {
  toolName: string;
  rating: number;
  description: string;
  date: string;
  affiliateLink?: string;
  pricing?: {
    min?: number;
    max?: number;
    currency?: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": data.toolName,
      "applicationCategory": "AI Tool",
      "operatingSystem": "Web",
      ...(data.pricing && {
        "offers": {
          "@type": "Offer",
          "url": data.affiliateLink,
          "priceCurrency": data.pricing.currency || "USD",
          ...(data.pricing.min && { "price": data.pricing.min }),
          ...(data.pricing.max && { "priceRange": `${data.pricing.min}-${data.pricing.max}` })
        }
      })
    },
    "author": {
      "@type": "Organization",
      "name": "Bench The Bots",
      "url": "https://benchthebots.ai"
    },
    "datePublished": data.date,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": data.rating,
      "bestRating": 10,
      "worstRating": 0
    },
    "reviewBody": data.description
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generate comparison table structured data
 */
export function generateComparisonStructuredData(tools: Array<{
  name: string;
  rating: number;
  price: string;
  category: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.name,
        "applicationCategory": tool.category,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating,
          "bestRating": 10,
          "worstRating": 0,
          "ratingCount": 1
        }
      }
    }))
  };
}

/**
 * Optimize title for SEO
 * Keep under 60 characters, include primary keyword
 */
export function optimizeTitle(title: string, maxLength = 60): string {
  if (title.length <= maxLength) {
    return title;
  }
  
  // Truncate and add ellipsis
  return title.substring(0, maxLength - 3) + '...';
}

/**
 * Optimize description for SEO
 * Keep under 160 characters, include call-to-action
 */
export function optimizeDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) {
    return description;
  }
  
  // Truncate at word boundary
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generate canonical URL
 */
export function getCanonicalURL(path: string, baseURL = 'https://benchthebots.ai'): string {
  // Remove trailing slash
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  return `${baseURL}${cleanPath}`;
}

/**
 * Generate social sharing URLs
 */
export function generateShareURLs(url: string, title: string) {
  const encodedURL = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
    reddit: `https://reddit.com/submit?url=${encodedURL}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedURL}`
  };
}
