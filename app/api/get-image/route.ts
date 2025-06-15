import {  NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    });

export async function GET(){
      
    try {
        const { resources } = await cloudinary.search
        .expression("resource_type:image AND folder:saas-next-project")
        .sort_by("created_at", "desc")
        .max_results(30)
        .execute();

        return NextResponse.json({images: resources}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: "Image fetching failed"}, {status: 500});
    }
}