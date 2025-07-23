# ByteLog - Full-Stack Blog Website

A modern, feature-rich blog platform built with React, TypeScript, Firebase, and Tailwind CSS.
Under CONSTRUCTION working to make BEST.

>live preview - https://bytelog-online.vercel.app/

## 🚀 Features

- **Authentication**: Email/password and Google login via Clerk (Free tier)
- **Rich Text Editor**: TipTap editor with formatting, images, and links
- **Dark/Light Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, and friendly URLs
- **Real-time Features**: Comments, likes, bookmarks, and sharing
- **User Dashboard**: Profile management and post creation
- **Advanced Search**: Filter by tags, categories, and content
- **Role-based Access**: Admin, Author, and Reader roles

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS  
- **Authentication**: Clerk Auth (Free tier)
- **Database**: MongoDB Atlas (Free tier)
- **Editor**: TipTap (Rich text editor)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **SEO**: React Helmet Async

## 📋 Prerequisites

- Node.js 18+ and npm
- Clerk account for authentication
- MongoDB Atlas account for database (optional)

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/itz-anas/ByteLog
cd ByteLog
npm install
```

### 2. Environment Configuration

Copy the example environment file:
```bash


### 3. Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Choose your authentication methods (Email/Password, Google, etc.)
4. Get your Publishable Key from the API Keys section

### 4. Update Environment Variables

Edit `.env` file with your Clerk configuration:

```env
# Clerk Authentication - Replace with your actual values
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# MongoDB Atlas - Replace with your actual connection string  
VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogdb

# Optional services (add when ready)
# VITE_MAILCHIMP_API_KEY=your_mailchimp_api_key
# VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to see your blog!

## 🔑 API Keys Setup

### Required (Free Tier):
- **Clerk**: Authentication (Free: 10,000 monthly active users)
- **MongoDB Atlas**: Database (Free: 512MB storage)

### Optional Services:
- **Mailchimp**: Newsletter (Free: 2,000 contacts)
- **MailerLite**: Newsletter alternative (Free: 1,000 subscribers)
- **Cloudinary**: Image optimization (Free: 10GB storage)
- **Google Analytics**: Website analytics (Free)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Editor/         # Rich text editor
│   ├── Layout/         # Header, Footer, Navigation
│   └── Posts/          # Post-related components
├── contexts/           # React contexts (Auth, Theme)
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── config/             # Configuration files
└── utils/              # Utility functions
```

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## 🔒 Security

- Environment variables are properly configured
- Clerk handles authentication security automatically
- MongoDB connection secured with proper credentials
- Input validation and sanitization implemented
- Rate limiting recommended for production

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

gmail - infodeveloper.mail@gmail.com
