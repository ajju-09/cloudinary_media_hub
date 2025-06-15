'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { NextResponse } from 'next/server';



const VideoUpload = () => {

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);


  const router = useRouter();

  const MAX_FILE_SIZE = 70 * 1024 * 1024;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!file) return;

    if(file.size > MAX_FILE_SIZE){
      toast.error("File is must be less than 70MB", {
        duration: 4000,
        position: "top-center"
      })
      return;
    }

    setIsUploading(true);
   
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      const response = await axios.post("/api/video-upload", formData);

      if(response){
        return NextResponse.json({message: "Video uploaded successfully"}, {status: 200});
      }
    
    } catch (error) {
      console.error(error);
      toast.error("Error in uploading video");
      return NextResponse.json({error: "Error in uploading video"}, {status: 500});

    } finally {
      setIsUploading(false);
      toast.success("Video uploaded successfully");
      router.push("/home");
    }

  }

  return (
     <div className="container mx-auto p-4 bg-[#16262e]">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-gray-300">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-gray-300">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-gray-300">Video File</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
  )
}

export default VideoUpload