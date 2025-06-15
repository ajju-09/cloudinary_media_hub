import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function DELETE(request: NextRequest){
    const { userId } = await auth();

    if(!userId){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

     if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary credentials not found" },
        { status: 500 }
      );
    }

    try {
        const {id, publicId} = await request.json();

        await cloudinary.uploader.destroy(publicId, {resource_type: "video" });

        await prisma.video.delete({where: {id}});

        return NextResponse.json({message: "Video deleted successfully"});
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}