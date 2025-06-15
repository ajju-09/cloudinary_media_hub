import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    });

export async function DELETE(request: NextRequest){
    try {
        const {publicId} = await request.json();
        await cloudinary.uploader.destroy(publicId, {resource_type: "image"});

        return NextResponse.json({message: "Image deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Failed to delete an image"}, {status: 500});
    }
}