import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, Globe, Clock } from 'lucide-react';
import RichTextEditor from '../components/Editor/RichTextEditor';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Write: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    categories: '',
    featuredImage: '',
    status: 'draft' as 'published' | 'draft' | 'scheduled',
    scheduledAt: '',
    seoTitle: '',
    seoDescription: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!user) {
      toast.error('You must be logged in to save posts');
      return;
    }

    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    setLoading(true);
    try {
      // Mock save - replace with actual API call
      const postData = {
        ...formData,
        status,
        authorId: user.uid,
        authorName: userProfile?.displayName || user.displayName || '',
        authorAvatar: userProfile?.photoURL || user.photoURL,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        categories: formData.categories.split(',').map(cat => cat.trim()).filter(Boolean),
        readTime: Math.ceil(formData.content.length / 1000), // Rough estimate
        createdAt: new Date(),
        updatedAt: new Date(),
        likesCount: 0,
        commentsCount: 0
      };

      console.log('Saving post:', postData);
      
      toast.success(status === 'published' ? 'Post published successfully!' : 'Post saved as draft!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Failed to save post');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = () => {
    const words = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200); // Average reading speed
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sign in required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be signed in to write posts.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Write New Post
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={() => handleSave('draft')}
              disabled={loading}
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            <button
              onClick={() => handleSave('published')}
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Globe className="h-4 w-4 mr-2" />
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your post title..."
                className="w-full text-3xl font-bold border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Image URL (optional)
              </label>
              <input
                type="url"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.featuredImage && (
                <img
                  src={formData.featuredImage}
                  alt="Featured"
                  className="mt-2 w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Content Editor */}
            {showPreview ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Preview
                </h2>
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your amazing story..."
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Post Status</h3>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>

              {formData.status === 'scheduled' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    value={formData.scheduledAt}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              )}

              <div className="mt-3 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                {calculateReadTime()} min read
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Excerpt</h3>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Brief description of your post..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none"
              />
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Tags</h3>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, javascript, tutorial"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate tags with commas
              </p>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
              <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                placeholder="Technology, Programming"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate categories with commas
              </p>
            </div>

            {/* SEO */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">SEO Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    placeholder="Leave empty to use post title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Leave empty to use excerpt"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;