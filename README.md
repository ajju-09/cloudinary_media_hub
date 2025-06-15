![image](https://github.com/user-attachments/assets/03f5125d-fdc3-442c-8c86-f4a2aaf45e98)Cloudinary Media Hub

Cloudinary Media Hub is a full-stack SaaS platform that allows users to upload, manage, and interact with their media content—images and videos—using Cloudinary as the storage and transformation engine. Built with Next.js, Prisma, NeonDB, Cloudinary, and styled using DaisyUI, this platform provides a seamless user experience for media management.

✨ Features

📷 Image Upload and Management
- Upload images directly to Cloudinary
- Automatically resize images during upload
- View uploaded images on a dedicated "Uploaded Images" page
- Download any image
- Delete uploaded images

🎥 Video Upload and Management
- Upload videos with title and description
- Backend video compression for optimized storage
- Watch video preview on hover
- Click to open videos in a separate tab for full viewing
- View all uploaded videos on "Uploaded Videos" page
- Delete videos when no longer needed

🛠️ Tech Stack

- Framework: [Next.js](https://nextjs.org)
- Database: [NeonDB](https://neon.tech)
- ORM: [Prisma](https://www.prisma.io/)
- Cloud Storage: [Cloudinary](https://cloudinary.com)
- UI Components: [DaisyUI](https://daisyui.com)

📂 Folder Structure (Simplified)
/pages
/api → API routes for uploads, deletions, etc.
/images → Uploaded images page
/videos → Uploaded videos page
/components → Reusable UI components
/lib → Cloudinary and Prisma helpers


🚀 Getting Started

1. Clone the Repository
bash
git clone https://github.com/yourusername/cloudinary-media-hub.git

2.Install Dependencies
npm install

3.Set Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

NEXT_PUBLIC_CLERK_SIGN_IN_URL=""
NEXT_PUBLIC_CLERK_SIGN_UP_URL=""

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
NEXT_PUBLIC_CLOUDINARY_API_SECRET=""

DATABASE_URL=""

4. Push Prisma Schema
 npx prisma db push

5. Run Development Server
  npm run dev

