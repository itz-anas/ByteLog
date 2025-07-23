// Environment configuration
export const env = {
  // Clerk Authentication
  clerk: {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  },

  // MongoDB
  mongodb: {
    uri: import.meta.env.VITE_MONGODB_URI,
  },

  // Optional: Newsletter services
  mailchimp: {
    apiKey: import.meta.env.VITE_MAILCHIMP_API_KEY,
    listId: import.meta.env.VITE_MAILCHIMP_LIST_ID,
  },

  mailerlite: {
    apiKey: import.meta.env.VITE_MAILERLITE_API_KEY,
  },

  // Optional: Image storage
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  },

  // Optional: Analytics
  googleAnalytics: {
    id: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  },

  // App configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'ByteLog',
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  },

  // Environment checks
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validation function to check required environment variables
export const validateEnv = () => {
  const requiredVars = [
    'VITE_CLERK_PUBLISHABLE_KEY',
  ];

  const missing = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};