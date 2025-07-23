/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Clerk Authentication
  readonly VITE_CLERK_PUBLISHABLE_KEY: string

  // Optional services
  readonly VITE_MONGODB_URI?: string
  readonly VITE_MAILCHIMP_API_KEY?: string
  readonly VITE_MAILCHIMP_LIST_ID?: string
  readonly VITE_MAILERLITE_API_KEY?: string
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string
  readonly VITE_CLOUDINARY_API_KEY?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
