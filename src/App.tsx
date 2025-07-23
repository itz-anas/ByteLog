import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { clerkConfig, darkThemeConfig, isClerkConfigured } from './config/clerk';
import { useTheme } from './contexts/ThemeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Write from './pages/Write';
import ExternalPosts from './pages/ExternalPosts';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  
  // Check if Clerk is properly configured
  if (!isClerkConfigured()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Setup Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please configure your Clerk authentication to continue.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Steps to setup:
            </h3>
            <ol className="text-left text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>1. Go to <a href="https://dashboard.clerk.com/" target="_blank" rel="noopener noreferrer" className="underline">Clerk Dashboard</a></li>
              <li>2. Create a new application</li>
              <li>3. Copy your Publishable Key</li>
              <li>4. Update VITE_CLERK_PUBLISHABLE_KEY in your .env file</li>
            </ol>
          </div>
          <a
            href="https://dashboard.clerk.com/last-active?path=api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Clerk API Keys →
          </a>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider 
      publishableKey={clerkConfig.publishableKey}
      appearance={theme === 'dark' ? darkThemeConfig.appearance : clerkConfig.appearance}
    >
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Helmet>
              <title>ByteLog - Where Stories Come Alive</title>
              <meta name="description" content="A modern blogging platform where writers and readers connect. Share your stories, discover amazing content, and join our community." />
              <meta name="keywords" content="blog, writing, stories, community, content" />
              <meta property="og:title" content="ByteLog - Where Stories Come Alive" />
              <meta property="og:description" content="A modern blogging platform where writers and readers connect." />
              <meta property="og:type" content="website" />
              <link rel="canonical" href="/" />
            </Helmet>
            
            <Header />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/write" element={<Write />} />
                <Route path="/external" element={<ExternalPosts />} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
            
            <Footer />
            
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                  border: '1px solid var(--toast-border)',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ClerkProvider>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;