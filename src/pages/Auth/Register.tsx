import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Join ByteLog Community
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Create your account and start sharing your stories with the world
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <SignUp 
            routing="path"
            path="/register"
            redirectUrl="/"
            signInUrl="/login"
          />
        </div>
        
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;