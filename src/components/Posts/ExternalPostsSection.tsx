import React, { useState, useEffect } from 'react';
import { RefreshCw, Globe, TrendingUp } from 'lucide-react';
import PostCard from './PostCard';
import { BlogPost } from '../../types/blog';
import { BlogAggregator, BLOG_SOURCES } from '../../services/blogAggregator';

const ExternalPostsSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const aggregator = BlogAggregator.getInstance();
      const externalPosts = await aggregator.fetchAllExternalPosts();
      setPosts(externalPosts);
    } catch (error) {
      console.error('Error fetching external posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const aggregator = BlogAggregator.getInstance();
      await aggregator.refreshCache();
      await fetchPosts();
    } catch (error) {
      console.error('Error refreshing posts:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredPosts = selectedSource === 'all' 
    ? posts 
    : posts.filter(post => post.source === selectedSource);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            External Blog Posts
          </h2>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full text-sm font-medium">
            {filteredPosts.length}
          </span>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Source Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedSource('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedSource === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Sources ({posts.length})
        </button>
        {BLOG_SOURCES.map((source) => {
          const count = posts.filter(post => post.source === source.name).length;
          if (count === 0) return null;
          
          return (
            <button
              key={source.name}
              onClick={() => setSelectedSource(source.name)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedSource === source.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <img src={source.logo} alt={source.name} className="h-4 w-4" />
              <span>{source.name} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} compact />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try refreshing or selecting a different source.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExternalPostsSection;