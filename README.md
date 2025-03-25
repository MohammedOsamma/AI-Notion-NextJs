# Collaborative Document Editor 🚀
A real-time collaborative document editing platform with AI-powered features, built with Next.js, Liveblocks, Firebase, and BlockNote.


# ✨ Features

Core Functionality
   
- Real-time collaboration with multiple users
- Live cursors showing other users' positions
- Document management (create, update, delete)
- User roles (owner/editor) with permission control

 AI-Powered Tools
  
- Chat with Document - Ask questions about document content
- Document Translation (implied by component)
- Markdown support for rich text formatting

UI/UX
  
- Dark/Light mode toggle
- Breadcrumb navigation
- User presence indicators (avatars)
- Responsive sidebar for document management


# 🛠️ Tech Stack
 Frontend:

- Next.js 13 (App Router)
- Liveblocks (Yjs integration)
- BlockNote (rich text editor)
- Shadcn UI

Backend:

- Firebase Firestore
- Clerk Authentication

Utilities:

- Sonner (toasts)
- React Hook Form
- Framer Motion


# 🧩 Key Components

Important Functions

- handleAskQuestion() - AI document Q&A
- updateTitle() - Firebase document updates
- handleInvite() - User collaboration management
- Real-time sync via LiveblocksYjsProvider

Hooks Used

- useOthers, useSelf (Liveblocks presence)
- useTransition for optimistic UI
- useDocumentData (Firebase)
- usePathname, useRouter (Next.js navigation)

  
# 🚀 Getting Started

Environment Setup

1- Clone repo
-git clone [your-repo-url]

2- Install dependencies
- npm install

3- Set up environment variables
- cp
- .env.example
- .env.local

Required Services
- Liveblocks API key
- Firebase project
- Clerk auth setup

Run Development Server
- npm run dev
