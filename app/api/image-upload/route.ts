import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Configuration
    cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    });

    interface CLoudinaryUploadResult {
        public_id: string;
        [key: string]: any
    }

    export async function POST(request: NextRequest){
        const { userId } = await auth();

        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        try {
            const formData = await request.formData();
            const file = formData.get("file") as File | null

            if(!file){
                return NextResponse.json({error: "File not found"}, {status: 400})
            }

            const bytes = await file.arrayBuffer();
            //converts it into a Node.js-friendly format
            const buffer = Buffer.from(bytes);

            const result = await new Promise<CLoudinaryUploadResult>(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {folder: "saas-next-project"},
                        (error, result) => {
                            if(error) reject(error);
                                else resolve(result as CLoudinaryUploadResult);
                        }
                    )
                    uploadStream.end(buffer);
                }
            )

            return NextResponse.json({PublicId: result.public_id}, {status: 200});


        } catch (error) {
            console.log("Upload image failed", error)
            return NextResponse.json({error: "Something went wrong in uploading image"}, {status: 500});
        }
    }

