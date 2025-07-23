export interface ExternalBlogSource {
  name: string;
  url: string;
  logo: string;
  rssUrl?: string;
  apiUrl?: string;
  selector?: {
    title: string;
    excerpt: string;
    link: string;
    author: string;
    date: string;
    image?: string;
  };
}

export const BLOG_SOURCES: ExternalBlogSource[] = [
  {
    name: 'Dev.to',
    url: 'https://dev.to',
    logo: 'https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png',
    apiUrl: 'https://dev.to/api/articles?per_page=10&top=7',
  },
  {
    name: 'Hashnode',
    url: 'https://hashnode.com',
    logo: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png',
    apiUrl: 'https://api.hashnode.com/graphql',
  },
  {
    name: 'FreeCodeCamp',
    url: 'https://freecodecamp.org',
    logo: 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg',
    rssUrl: 'https://www.freecodecamp.org/news/rss/',
  },
  {
    name: 'CSS-Tricks',
    url: 'https://css-tricks.com',
    logo: 'https://css-tricks.com/wp-content/uploads/2019/06/akqcss.jpg',
    rssUrl: 'https://css-tricks.com/feed/',
  }
];

export class BlogAggregator {
  private static instance: BlogAggregator;
  private cache: Map<string, any[]> = new Map();
  private lastFetch: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  static getInstance(): BlogAggregator {
    if (!BlogAggregator.instance) {
      BlogAggregator.instance = new BlogAggregator();
    }
    return BlogAggregator.instance;
  }

  async fetchFromDevTo(): Promise<any[]> {
    try {
      const response = await fetch('https://dev.to/api/articles?per_page=10&top=7');
      if (!response.ok) throw new Error('Failed to fetch from Dev.to');
      
      const articles = await response.json();
      return articles.map((article: any) => ({
        id: `devto-${article.id}`,
        title: article.title,
        excerpt: article.description || article.title,
        content: article.body_markdown || '',
        slug: article.slug,
        authorId: `devto-${article.user.id}`,
        authorName: article.user.name,
        authorAvatar: article.user.profile_image,
        tags: article.tag_list || [],
        categories: ['Technology'],
        featuredImage: article.cover_image || article.social_image,
        status: 'published',
        createdAt: new Date(article.published_at),
        updatedAt: new Date(article.edited_at || article.published_at),
        likesCount: article.positive_reactions_count || 0,
        commentsCount: article.comments_count || 0,
        readTime: article.reading_time_minutes || 5,
        isExternal: true,
        originalUrl: article.url,
        source: 'Dev.to',
        sourceLogo: BLOG_SOURCES.find(s => s.name === 'Dev.to')?.logo
      }));
    } catch (error) {
      console.error('Error fetching from Dev.to:', error);
      return [];
    }
  }

  async fetchFromHashnode(): Promise<any[]> {
    try {
      const query = `
        query {
          feed(type: FEATURED, first: 10) {
            edges {
              node {
                id
                title
                brief
                slug
                url
                coverImage
                publishedAt
                updatedAt
                readTimeInMinutes
                reactionCount
                responseCount
                tags {
                  name
                }
                author {
                  id
                  name
                  profilePicture
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) throw new Error('Failed to fetch from Hashnode');
      
      const data = await response.json();
      const articles = data.data?.feed?.edges || [];

      return articles.map((edge: any) => {
        const article = edge.node;
        return {
          id: `hashnode-${article.id}`,
          title: article.title,
          excerpt: article.brief,
          content: '',
          slug: article.slug,
          authorId: `hashnode-${article.author.id}`,
          authorName: article.author.name,
          authorAvatar: article.author.profilePicture,
          tags: article.tags?.map((tag: any) => tag.name) || [],
          categories: ['Technology'],
          featuredImage: article.coverImage,
          status: 'published',
          createdAt: new Date(article.publishedAt),
          updatedAt: new Date(article.updatedAt),
          likesCount: article.reactionCount || 0,
          commentsCount: article.responseCount || 0,
          readTime: article.readTimeInMinutes || 5,
          isExternal: true,
          originalUrl: article.url,
          source: 'Hashnode',
          sourceLogo: BLOG_SOURCES.find(s => s.name === 'Hashnode')?.logo
        };
      });
    } catch (error) {
      console.error('Error fetching from Hashnode:', error);
      return [];
    }
  }

  async parseRSSFeed(rssUrl: string, sourceName: string): Promise<any[]> {
    try {
      // Using a CORS proxy for RSS feeds
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) throw new Error(`Failed to fetch RSS from ${sourceName}`);
      
      const data = await response.json();
      const items = data.items || [];

      return items.slice(0, 10).map((item: any, index: number) => ({
        id: `${sourceName.toLowerCase()}-${Date.now()}-${index}`,
        title: item.title,
        excerpt: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        content: item.content || item.description || '',
        slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        authorId: `${sourceName.toLowerCase()}-author`,
        authorName: item.author || sourceName,
        authorAvatar: '',
        tags: item.categories || [],
        categories: ['Technology'],
        featuredImage: item.thumbnail || item.enclosure?.link,
        status: 'published',
        createdAt: new Date(item.pubDate),
        updatedAt: new Date(item.pubDate),
        likesCount: 0,
        commentsCount: 0,
        readTime: Math.ceil((item.content || item.description || '').length / 1000),
        isExternal: true,
        originalUrl: item.link,
        source: sourceName,
        sourceLogo: BLOG_SOURCES.find(s => s.name === sourceName)?.logo
      }));
    } catch (error) {
      console.error(`Error fetching RSS from ${sourceName}:`, error);
      return [];
    }
  }

  async fetchAllExternalPosts(): Promise<any[]> {
    const now = Date.now();
    const cacheKey = 'all-external-posts';
    
    // Check cache
    if (this.cache.has(cacheKey) && 
        this.lastFetch.has(cacheKey) && 
        now - this.lastFetch.get(cacheKey)! < this.CACHE_DURATION) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const [devToPosts, hashnodePosts, fccPosts, cssTricksPosts] = await Promise.allSettled([
        this.fetchFromDevTo(),
        this.fetchFromHashnode(),
        this.parseRSSFeed('https://www.freecodecamp.org/news/rss/', 'FreeCodeCamp'),
        this.parseRSSFeed('https://css-tricks.com/feed/', 'CSS-Tricks')
      ]);

      const allPosts = [
        ...(devToPosts.status === 'fulfilled' ? devToPosts.value : []),
        ...(hashnodePosts.status === 'fulfilled' ? hashnodePosts.value : []),
        ...(fccPosts.status === 'fulfilled' ? fccPosts.value : []),
        ...(cssTricksPosts.status === 'fulfilled' ? cssTricksPosts.value : [])
      ];

      // Sort by date and limit to 50 posts
      const sortedPosts = allPosts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 50);

      // Cache the results
      this.cache.set(cacheKey, sortedPosts);
      this.lastFetch.set(cacheKey, now);

      return sortedPosts;
    } catch (error) {
      console.error('Error fetching external posts:', error);
      return this.cache.get(cacheKey) || [];
    }
  }

  async refreshCache(): Promise<void> {
    this.cache.clear();
    this.lastFetch.clear();
    await this.fetchAllExternalPosts();
  }
}