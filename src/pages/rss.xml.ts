import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const reviews = await getCollection('reviews');
  const technical = await getCollection('technical');
  
  // Combine and sort by date
  const allPosts = [...reviews, ...technical].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Bench The Bots - Expert AI Tool Reviews',
    description: 'Independent, expert reviews and benchmarks of AI tools. Honest ratings, pricing, and recommendations.',
    site: context.site || 'https://benchthebots.ai',
    items: allPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/reviews/${post.slug}/`,
      pubDate: new Date(post.data.date),
      author: post.data.author || 'Zane Merrick',
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
