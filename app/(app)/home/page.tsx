'use client'
import React, { useCallback, useEffect, useState } from 'react'
import VideoCard from '@/components/VideoCard';
import axios from 'axios';
import { Video } from '@/types/videos';
import toast from 'react-hot-toast';
import {Skeleton} from "@heroui/skeleton";
import {Card } from "@heroui/card";


const Home = () => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideo = useCallback( async () => {
    try {
      
      const response = await axios.get("/api/videos");

      if(Array.isArray(response.data)){
        setVideos(response.data);
      }
      else {
         throw new Error("Unexpected Error occured"); 
      }

    } catch (error) {
      console.error(error);
      setError("Error in fetching videos");

    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchVideo();
  } ,[fetchVideo])

  const handleDownload = useCallback((url: string, title: string) => {

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute('download', `${title}.mp4`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
  }, []);

  const handleDelete = useCallback(async (id: string, publicId: string) => {
    const confirmed = confirm("Are you sure you want to delete this video?");

    if(!confirmed) return;
    try {
      await axios.delete('/api/video-delete', { data : { id, publicId}})
      setVideos(prev => prev.filter(video => video.id !== id));
      toast.success("Video deleted successfully");
    } catch (error) {
      console.error("Video delete failed", error);
    }

    
  }, []);

  if(loading){
    return <div className='grid grid-cols-3 gap-4'>
      <Card className="w-[200px] space-y-5 p-4 bg-gray-700 rounded-2xl" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-gray-600" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-gray-600" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-gray-600" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-gray-500" />
        </Skeleton>
      </div>
    </Card> 

     <Card className="w-[200px] space-y-5 p-4 bg-gray-700 rounded-2xl" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-gray-600" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-gray-600" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-gray-600" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-gray-500" />
        </Skeleton>
      </div>
    </Card> 

      <Card className="w-[200px] space-y-5 p-4 bg-gray-700 rounded-2xl" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-gray-600" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-gray-600" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-gray-600" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-gray-500" />
        </Skeleton>
      </div>
    </Card> 
    </div>
  }


  return (

    <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Videos</h1>
          {videos.length === 0 ? (
            <div className="text-center text-lg text-gray-500">
              No videos available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        video={{
                          ...video,
                          originalSize: String(video.originalSize),
                          compressedSize: String(video.compressedSize),
                        }}
                        onDownload={handleDownload}
                        onDelete={handleDelete}
                    />
                ))
              }
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}
        </div>
  )
}

export default Home