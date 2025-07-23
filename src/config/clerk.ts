import { env } from './env';

// Validation moved to component level to prevent module loading errors
export const isClerkConfigured = () => {
  return env.clerk.publishableKey && env.clerk.publishableKey !== 'pk_test_your_clerk_publishable_key_here';
};

export const clerkConfig = {
  publishableKey: env.clerk.publishableKey,
  appearance: {
    baseTheme: undefined, // Will be set dynamically based on theme
    variables: {
      colorPrimary: '#3B82F6',
      colorBackground: '#ffffff',
      colorInputBackground: '#ffffff',
      colorInputText: '#1f2937',
      colorText: '#1f2937',
      colorTextSecondary: '#6b7280',
      colorSuccess: '#10b981',
      colorDanger: '#ef4444',
      colorWarning: '#f59e0b',
      borderRadius: '0.5rem',
    },
    elements: {
      formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
      card: 'shadow-lg border border-gray-200',
      headerTitle: 'text-gray-900',
      headerSubtitle: 'text-gray-600',
      socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
      formFieldInput: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      footerActionLink: 'text-blue-600 hover:text-blue-700',
    },
  },
};

export const darkThemeConfig = {
  ...clerkConfig,
  appearance: {
    ...clerkConfig.appearance,
    variables: {
      ...clerkConfig.appearance.variables,
      colorBackground: '#1f2937',
      colorInputBackground: '#374151',
      colorInputText: '#f9fafb',
      colorText: '#f9fafb',
      colorTextSecondary: '#d1d5db',
    },
    elements: {
      ...clerkConfig.appearance.elements,
      card: 'shadow-lg border border-gray-700 bg-gray-800',
      headerTitle: 'text-gray-100',
      headerSubtitle: 'text-gray-300',
      socialButtonsBlockButton: 'border border-gray-600 hover:bg-gray-700 text-gray-200',
      formFieldInput: 'border border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-700 text-gray-100',
      footerActionLink: 'text-blue-400 hover:text-blue-300',
    },
  },
};