import React, { createContext, useContext, ReactNode } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'author' | 'reader';
  bio?: string;
  createdAt: Date;
  postsCount: number;
}

interface AuthContextType {
  user: any;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerkAuth();

  // Convert Clerk user to our user profile format
  const userProfile: UserProfile | null = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || '',
    displayName: user.fullName || user.firstName || 'User',
    photoURL: user.imageUrl,
    role: 'author', // Default role, can be updated based on your logic
    createdAt: new Date(user.createdAt || Date.now()),
    postsCount: 0, // This would come from your database
  } : null;

  const signOut = async () => {
    try {
      await clerkSignOut();
      toast.success('Signed out successfully!');
    } catch (error: any) {
      toast.error('Failed to sign out');
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      // Update user profile in your database
      // This would typically be an API call to your backend
      console.log('Updating user profile:', data);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading: !isLoaded,
    signOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};