import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Bookmark, Share2, Clock, ExternalLink } from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface PostCardProps {
  post: BlogPost;
  showAuthor?: boolean;
  compact?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showAuthor = true, compact = false }) => {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle like functionality
    console.log('Like post:', post.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle bookmark functionality
    console.log('Bookmark post:', post.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle share functionality
    navigator.share?.({
      title: post.title,
      text: post.excerpt,
      url: `/posts/${post.slug}`,
    }) || console.log('Share post:', post.id);
  };

  const handlePostClick = (e: React.MouseEvent) => {
    if (post.isExternal && post.originalUrl) {
      e.preventDefault();
      window.open(post.originalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const PostLink = post.isExternal ? 'div' : Link;
  const linkProps = post.isExternal ? { onClick: handlePostClick, className: 'cursor-pointer' } : { to: `/posts/${post.slug}` };

  if (compact) {
    return (
      <PostLink
        {...linkProps}
        className="group block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white dark:bg-gray-800"
      >
        <div className="flex items-start space-x-4">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              {post.title}
              {post.isExternal && (
                <ExternalLink className="inline h-4 w-4 ml-2 text-gray-400" />
              )}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
              {post.excerpt}
            </p>
            {post.isExternal && (
              <div className="flex items-center mt-2">
                <img src={post.sourceLogo} alt={post.source} className="h-4 w-4 mr-2" />
                <span className="text-xs text-gray-500 dark:text-gray-400">from {post.source}</span>
              </div>
            )}
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime} min read
              </span>
              <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </PostLink>
    );
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      {post.featuredImage && (
        <PostLink {...linkProps}>
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </PostLink>
      )}

      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Title and Excerpt */}
        <PostLink {...linkProps} className="group">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 line-clamp-2">
            {post.title}
            {post.isExternal && (
              <ExternalLink className="inline h-5 w-5 ml-2 text-gray-400" />
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        </PostLink>

        {/* External Source Badge */}
        {post.isExternal && (
          <div className="flex items-center mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <img src={post.sourceLogo} alt={post.source} className="h-5 w-5 mr-2" />
            <span className="text-sm text-blue-700 dark:text-blue-300">Originally published on {post.source}</span>
          </div>
        )}

        {/* Author and Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showAuthor && (
              <>
                <Link to={`/authors/${post.authorId}`} className="flex items-center space-x-2 group">
                  {post.authorAvatar ? (
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {post.authorName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.authorName}
                  </span>
                </Link>
                <span className="text-gray-300 dark:text-gray-600">•</span>
              </>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime} min read
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {!post.isExternal && <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span className="text-sm">{post.likesCount}</span>
            </button>}
            {!post.isExternal && <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.commentsCount}</span>
            </button>}
            {!post.isExternal && <button
              onClick={handleBookmark}
              className="text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
            >
              <Bookmark className="h-4 w-4" />
            </button>}
            <button
              onClick={handleShare}
              className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;