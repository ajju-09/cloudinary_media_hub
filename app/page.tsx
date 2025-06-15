import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url('mountain.avif')",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold text-[#80ffdb]">Cloudinary Media Hub</h1>
            <p className="text-xl font-bold text-[#f0f757]">Upload, Preview, Share –  Smarter with AI</p>
            <p className="mb-5 text-[#bdc4a7]">
              Easily upload videos and images, preview them instantly, track file details, resize images using AI, and manage your media effortlessly — all powered by Cloudinary and built with Next.js, Prisma, and Clerk.
            </p>
            <Link href="/home">
            <button className="btn btn-success rounded-2xl w-md text-lg text-black">Upload Things</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
