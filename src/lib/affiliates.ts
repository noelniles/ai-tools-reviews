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
 * Helper to check if a tool has an active affiliate program
 */
export function hasAffiliateProgram(toolSlug: string): boolean {
  const link = AFFILIATE_LINKS[toolSlug]?.primary;
  return !!link && link.commission !== 'No affiliate program';
}
