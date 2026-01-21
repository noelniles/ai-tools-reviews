/**
 * Affiliate Links Configuration
 * 
 * Centralized management of affiliate links and tracking parameters.
 * Update these as you get approved for affiliate programs.
 */

export interface AffiliateLink {
  url: string;
  network?: 'impact' | 'cj' | 'partnerstack' | 'direct' | 'amazon';
  commission?: string; // e.g., "30% recurring" or "$50 per sale"
  cookieDuration?: number; // in days
}

export interface ToolAffiliateLinks {
  primary?: AffiliateLink;
  secondary?: AffiliateLink;
  alternative?: AffiliateLink;
}

/**
 * AFFILIATE LINKS DIRECTORY
 * 
 * Keep this updated as you join new affiliate programs.
 * Each entry should have the affiliate URL with your tracking ID.
 */
export const AFFILIATE_LINKS: Record<string, ToolAffiliateLinks> = {
  // Text Generation Tools
  'chatgpt': {
    primary: {
      url: 'https://chat.openai.com/?via=aitoolsreviews', // Update with real affiliate link
      network: 'direct',
      commission: 'Revenue share TBD',
      cookieDuration: 30,
    },
  },
  
  'claude': {
    primary: {
      url: 'https://claude.ai/?via=aitoolsreviews', // Update with real affiliate link
      network: 'direct',
      commission: 'Revenue share TBD',
      cookieDuration: 30,
    },
  },
  
  'jasper': {
    primary: {
      url: 'https://www.jasper.ai/?fpr=aitools', // PRIORITY: Apply at https://www.jasper.ai/affiliates
      network: 'partnerstack',
      commission: '30% recurring',
      cookieDuration: 90,
    },
  },
  
  'copy-ai': {
    primary: {
      url: 'https://www.copy.ai/?via=aitools', // Apply at https://www.copy.ai/affiliate-program
      network: 'partnerstack',
      commission: '25% recurring',
      cookieDuration: 60,
    },
  },
  
  // Code Generation Tools
  'github-copilot': {
    primary: {
      url: 'https://github.com/features/copilot?ref=aitoolsreviews',
      network: 'direct',
      commission: 'No affiliate program (yet)',
      cookieDuration: 0,
    },
  },
  
  'cursor': {
    primary: {
      url: 'https://cursor.sh/?via=aitoolsreviews',
      network: 'direct',
      commission: 'Check if they have affiliate program',
      cookieDuration: 30,
    },
  },
  
  'replit': {
    primary: {
      url: 'https://replit.com/?via=aitools',
      network: 'direct',
      commission: 'Contact for affiliate program',
      cookieDuration: 30,
    },
  },
  
  // Image Generation Tools
  'midjourney': {
    primary: {
      url: 'https://www.midjourney.com/home?ref=aitoolsreviews',
      network: 'direct',
      commission: 'No affiliate program',
      cookieDuration: 0,
    },
  },
  
  'dall-e': {
    primary: {
      url: 'https://openai.com/dall-e-3?via=aitools',
      network: 'direct',
      commission: 'Part of OpenAI - check for program',
      cookieDuration: 30,
    },
  },
  
  'stable-diffusion': {
    primary: {
      url: 'https://stability.ai/?via=aitools',
      network: 'direct',
      commission: 'Check stability.ai affiliate program',
      cookieDuration: 30,
    },
  },
  
  // Video Generation Tools
  'runway': {
    primary: {
      url: 'https://runwayml.com/?via=aitools',
      network: 'direct',
      commission: 'Contact for partnership',
      cookieDuration: 30,
    },
  },
  
  'pika': {
    primary: {
      url: 'https://pika.art/?ref=aitoolsreviews',
      network: 'direct',
      commission: 'Check for affiliate program',
      cookieDuration: 30,
    },
  },
  
  // Voice/Audio Tools
  'elevenlabs': {
    primary: {
      url: 'https://elevenlabs.io/?from=aitools', // Check https://elevenlabs.io/affiliate
      network: 'direct',
      commission: '30% recurring (verify)',
      cookieDuration: 60,
    },
  },
  
  'otter-ai': {
    primary: {
      url: 'https://otter.ai/?via=aitools',
      network: 'direct',
      commission: 'Contact for affiliate program',
      cookieDuration: 30,
    },
  },
  
  // Productivity Tools
  'notion': {
    primary: {
      url: 'https://www.notion.so/?via=aitoolsreviews', // Apply at https://www.notion.so/affiliates
      network: 'impact',
      commission: '$10 per signup',
      cookieDuration: 30,
    },
  },
  
  'perplexity': {
    primary: {
      url: 'https://www.perplexity.ai/?via=aitools',
      network: 'direct',
      commission: 'Check for affiliate program',
      cookieDuration: 30,
    },
  },
  
  // API/Platform Tools
  'replicate': {
    primary: {
      url: 'https://replicate.com/?via=aitools',
      network: 'direct',
      commission: 'Contact for partnership',
      cookieDuration: 30,
    },
  },
  
  'openai-assistants': {
    primary: {
      url: 'https://platform.openai.com/assistants?via=aitools',
      network: 'direct',
      commission: 'Part of OpenAI platform',
      cookieDuration: 30,
    },
  },

  // NEW ADDITIONS - High-Value Affiliate Programs
  
  // Content & Writing Tools
  'grammarly': {
    primary: {
      url: 'https://www.grammarly.com/?via=aitools',
      network: 'impact',
      commission: '$0.20 per signup + $20 per premium',
      cookieDuration: 90,
    },
  },

  'writesonic': {
    primary: {
      url: 'https://writesonic.com/?via=aitools',
      network: 'direct',
      commission: '30% recurring',
      cookieDuration: 60,
    },
  },

  'rytr': {
    primary: {
      url: 'https://rytr.me/?via=aitools',
      network: 'direct',
      commission: '25% recurring',
      cookieDuration: 45,
    },
  },

  // Design & Creative Tools
  'canva': {
    primary: {
      url: 'https://www.canva.com/?via=aitools',
      network: 'impact',
      commission: '$36 per Pro signup',
      cookieDuration: 30,
    },
  },

  'designai': {
    primary: {
      url: 'https://designs.ai/?via=aitools',
      network: 'direct',
      commission: '30% recurring',
      cookieDuration: 60,
    },
  },

  // Marketing & SEO Tools
  'surfer-seo': {
    primary: {
      url: 'https://surferseo.com/?via=aitools',
      network: 'direct',
      commission: '25% recurring',
      cookieDuration: 60,
    },
  },

  'frase': {
    primary: {
      url: 'https://www.frase.io/?via=aitools',
      network: 'direct',
      commission: '30% recurring',
      cookieDuration: 90,
    },
  },

  'semrush': {
    primary: {
      url: 'https://www.semrush.com/?via=aitools',
      network: 'impact',
      commission: '$200 per sale (40%)',
      cookieDuration: 120,
    },
  },

  // Chatbot & Customer Service
  'intercom': {
    primary: {
      url: 'https://www.intercom.com/?via=aitools',
      network: 'impact',
      commission: '20% recurring first year',
      cookieDuration: 90,
    },
  },

  'drift': {
    primary: {
      url: 'https://www.drift.com/?via=aitools',
      network: 'impact',
      commission: 'Varies by plan',
      cookieDuration: 90,
    },
  },

  // Translation & Language
  'deepl': {
    primary: {
      url: 'https://www.deepl.com/pro?via=aitools',
      network: 'direct',
      commission: 'Contact for program',
      cookieDuration: 30,
    },
  },

  // Data & Analytics AI
  'tableau': {
    primary: {
      url: 'https://www.tableau.com/?via=aitools',
      network: 'cj',
      commission: 'Varies',
      cookieDuration: 90,
    },
  },

  // Learning Platforms with AI
  'coursera': {
    primary: {
      url: 'https://www.coursera.org/?via=aitools',
      network: 'impact',
      commission: '20-45% per enrollment',
      cookieDuration: 30,
    },
  },

  'udemy': {
    primary: {
      url: 'https://www.udemy.com/?via=aitools',
      network: 'impact',
      commission: '15% per sale',
      cookieDuration: 7,
    },
  },

  // Development Tools
  'tabnine': {
    primary: {
      url: 'https://www.tabnine.com/?via=aitools',
      network: 'direct',
      commission: 'Contact for program',
      cookieDuration: 30,
    },
  },

  'codeium': {
    primary: {
      url: 'https://codeium.com/?via=aitools',
      network: 'direct',
      commission: 'Contact for program',
      cookieDuration: 30,
    },
  },
};

/**
 * AFFILIATE NETWORKS TO JOIN
 * 
 * Priority order for applications:
 */
export const AFFILIATE_NETWORKS = {
  impact: {
    url: 'https://impact.com',
    description: 'Largest SaaS affiliate network',
    priority: 1,
    tools: ['Notion', 'Grammarly', 'Monday.com', 'Many SaaS tools'],
  },
  
  cj: {
    url: 'https://www.cj.com',
    description: 'Commission Junction - another major network',
    priority: 2,
    tools: ['Various enterprise tools'],
  },
  
  partnerstack: {
    url: 'https://partnerstack.com',
    description: 'Popular for SaaS companies',
    priority: 1,
    tools: ['Jasper', 'Copy.ai', 'Many AI tools'],
  },
  
  amazon: {
    url: 'https://affiliate-program.amazon.com',
    description: 'For AI books, courses, hardware',
    priority: 3,
    tools: ['Books', 'Courses', 'GPU hardware', 'Accessories'],
  },
};

/**
 * MONETIZATION TODO LIST
 * 
 * Complete these steps in order:
 */
export const MONETIZATION_CHECKLIST = [
  '1. Set up Google Analytics 4 (get tracking ID)',
  '2. Apply to Impact.com network',
  '3. Apply to PartnerStack',
  '4. Apply to Jasper affiliate program directly',
  '5. Apply to Copy.ai affiliate program',
  '6. Apply to Notion affiliate program',
  '7. Apply to Amazon Associates',
  '8. Contact ElevenLabs about affiliate program',
  '9. Add affiliate disclosure to all pages (already done)',
  '10. Test all affiliate links before launch',
  '11. Set up conversion tracking pixels where required',
  '12. Monitor first 30 days to see which tools convert best',
  '13. Focus content on highest-converting tools',
];

/**
 * Helper function to get affiliate link for a tool
 */
export function getAffiliateLink(toolSlug: string): AffiliateLink | undefined {
  return AFFILIATE_LINKS[toolSlug]?.primary;
}

/**
 * Get all affiliate links for a tool (primary, secondary, alternative)
 */
export function getAllAffiliateLinks(toolSlug: string): ToolAffiliateLinks {
  return AFFILIATE_LINKS[toolSlug] || {};
}

/**
 * Get commission rate for display
 */
export function getCommissionRate(toolSlug: string): string {
  const link = getAffiliateLink(toolSlug);
  return link?.commission || 'Contact for details';
}

/**
 * Get cookie duration in human-readable format
 */
export function getCookieDuration(toolSlug: string): string {
  const link = getAffiliateLink(toolSlug);
  if (!link?.cookieDuration) return 'N/A';
  
  const days = link.cookieDuration;
  if (days >= 90) return `${Math.floor(days / 30)} months`;
  if (days >= 30) return '1 month';
  return `${days} days`;
}

/**
 * Get tools by network for batch application
 */
export function getToolsByNetwork(network: 'impact' | 'cj' | 'partnerstack' | 'direct' | 'amazon'): string[] {
  return Object.entries(AFFILIATE_LINKS)
    .filter(([_, links]) => links.primary?.network === network)
    .map(([slug, _]) => slug);
}

/**
 * Priority affiliate programs to apply to (highest earning potential)
 */
export const PRIORITY_PROGRAMS = [
  { slug: 'jasper', reason: '30% recurring, high ticket ($49-125/mo)' },
  { slug: 'semrush', reason: '$200 per sale, high conversion' },
  { slug: 'copy-ai', reason: '25% recurring, popular tool' },
  { slug: 'notion', reason: 'Easy approval, consistent income' },
  { slug: 'grammarly', reason: '$20 per premium, mass appeal' },
  { slug: 'canva', reason: '$36 per Pro signup, huge audience' },
  { slug: 'elevenlabs', reason: '30% recurring, growing market' },
  { slug: 'surfer-seo', reason: '25% recurring, $59-219/mo plans' },
  { slug: 'frase', reason: '30% recurring, high intent audience' },
  { slug: 'writesonic', reason: '30% recurring, alternative to Jasper' },
];

/**
 * CTA variations for A/B testing
 */
export const CTA_VARIATIONS = {
  default: {
    primary: 'Visit Site →',
    secondary: 'Get Started →',
  },
  urgency: {
    primary: 'Try Free Now →',
    secondary: 'Start Your Trial →',
  },
  value: {
    primary: 'Get Started Free →',
    secondary: 'Start Free Trial →',
  },
  social: {
    primary: 'Join 1M+ Users →',
    secondary: 'See Why It\'s Popular →',
  },
};
