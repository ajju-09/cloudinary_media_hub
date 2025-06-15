"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CldImage } from "next-cloudinary";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const UploadedImages = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/get-image")
      .then((res) => setImages(res.data.images))
      .catch(() => toast.error("Failed to load images"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (publicId: string) => {
    const confirmed = confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;

    try {
      await axios.delete("/api/delete-image", { data: { publicId } });
      setImages((prev) => prev.filter((img) => img.public_id !== publicId));
      toast.success("Image deleted");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  if (loading) {
    return  <div className='grid grid-cols-3 gap-4'>
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
  };

  if (!loading && images.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10 text-xl">
        No images uploaded yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {images.map((img) => (
        <div key={img.asset_id} className="card bg-base-200 shadow-lg rounded-2xl">
          <CldImage
            width="400"
            height="300"
            src={img.public_id}
            alt="Uploaded Image"
            crop="fill"
            gravity="auto"
            className="rounded-2xl hover:scale-105 transition-transform duration-500 ease-in-out hover:cursor-pointer"
          />
          <div className="card-body">
            <button
              onClick={() => handleDelete(img.public_id)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadedImages;
