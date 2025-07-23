import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import PostCard from '../components/Posts/PostCard';
import { BlogPost, Category } from '../types/blog';
import { BlogAggregator } from '../services/blogAggregator';

const Home: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [externalPosts, setExternalPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [externalLoading, setExternalLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const mockFeaturedPosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Future of Web Development: Trends to Watch in 2024',
        content: '<p>Full content here...</p>',
        excerpt: 'Explore the latest trends shaping the future of web development, from AI-powered tools to new frameworks.',
        slug: 'future-of-web-development-2024',
        authorId: 'author1',
        authorName: 'Sarah Johnson',
        authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        tags: ['Web Development', 'Technology', 'Trends'],
        categories: ['Technology'],
        featuredImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
        status: 'published',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        likesCount: 142,
        commentsCount: 23,
        readTime: 8,
        seoTitle: 'The Future of Web Development: Trends to Watch in 2024',
        seoDescription: 'Discover the latest trends in web development for 2024'
      },
      {
        id: '2',
        title: 'Building Scalable React Applications with Modern Architecture',
        content: '<p>Full content here...</p>',
        excerpt: 'Learn how to structure large React applications for maintainability and performance.',
        slug: 'scalable-react-applications-architecture',
        authorId: 'author2',
        authorName: 'Mike Chen',
        authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        tags: ['React', 'Architecture', 'JavaScript'],
        categories: ['Programming'],
        featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
        status: 'published',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-14'),
        likesCount: 89,
        commentsCount: 15,
        readTime: 12,
      }
    ];

    const mockLatestPosts: BlogPost[] = [
      ...mockFeaturedPosts,
      {
        id: '3',
        title: 'CSS Grid vs Flexbox: When to Use Which',
        content: '<p>Full content here...</p>',
        excerpt: 'A comprehensive comparison of CSS Grid and Flexbox with practical examples.',
        slug: 'css-grid-vs-flexbox-guide',
        authorId: 'author3',
        authorName: 'Emma Davis',
        authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        tags: ['CSS', 'Layout', 'Frontend'],
        categories: ['Design'],
        featuredImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
        status: 'published',
        createdAt: new Date('2024-01-13'),
        updatedAt: new Date('2024-01-13'),
        likesCount: 67,
        commentsCount: 8,
        readTime: 6,
      }
    ];

    const mockCategories: Category[] = [
      { id: '1', name: 'Technology', slug: 'technology', postsCount: 45 },
      { id: '2', name: 'Programming', slug: 'programming', postsCount: 38 },
      { id: '3', name: 'Design', slug: 'design', postsCount: 29 },
      { id: '4', name: 'Business', slug: 'business', postsCount: 22 },
    ];

    setTimeout(() => {
      setFeaturedPosts(mockFeaturedPosts);
      setLatestPosts(mockLatestPosts);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  // Fetch external blog posts
  useEffect(() => {
    const fetchExternalPosts = async () => {
      try {
        const aggregator = BlogAggregator.getInstance();
        const posts = await aggregator.fetchAllExternalPosts();
        setExternalPosts(posts);
      } catch (error) {
        console.error('Error fetching external posts:', error);
      } finally {
        setExternalLoading(false);
      }
    };

    fetchExternalPosts();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Simulate subscription process
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
      // Reset success message after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }, 500);
  };
  const stats = [
    { icon: BookOpen, label: 'Total Posts', value: '2.1K' },
    { icon: Users, label: 'Active Writers', value: '450' },
    { icon: TrendingUp, label: 'Monthly Readers', value: '50K' },
    { icon: Award, label: 'Featured Stories', value: '128' },
  ];

  if (loading && externalLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to ByteLog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover amazing stories, share your thoughts, and connect with a community 
            of passionate writers and readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/posts"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Posts
            </Link>
            <Link
              to="/write"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Start Writing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Posts
            </h2>
            <Link
              to="/posts"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View all posts →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* External Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Trending from the Community
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Latest posts from popular development blogs
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalLoading ? (
              [...Array(6)].map((_, i) => <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-lg"></div>)
            ) : (
              externalPosts.slice(0, 6).map((post) => <PostCard key={post.id} post={post} compact />)
            )}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Latest Posts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Popular Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors text-center group"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {category.postsCount} posts
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {subscribed ? (
            <div className="animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                All Set! 🎉
              </h2>
              <p className="text-blue-100 text-lg">
                Thanks for subscribing! You'll receive the latest stories in your inbox.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white mb-4">
                Never Miss a Story
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Subscribe to our newsletter and get the latest posts delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 text-gray-900"
                />
                <button 
                  type="submit"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50"
                  disabled={!email.trim()}
                >
                  Subscribe
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;