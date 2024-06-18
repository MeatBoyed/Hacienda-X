"use server";
import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import {
  AWS_S3_BASE_URL,
  AWS_S3_PRODUCTION_FOLDER_NAME,
} from "../(utils)/utils";
import { v4 as uuidv4 } from "uuid";

const NEXT_PUBLIC_S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const NEXT_PUBLIC_S3_BUCKET_LOCATION =
  process.env.NEXT_PUBLIC_S3_BUCKET_LOCATION;
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

// Ensure envs exist
if (
  !NEXT_PUBLIC_S3_BUCKET_NAME ||
  !NEXT_PUBLIC_S3_BUCKET_LOCATION ||
  !S3_ACCESS_KEY ||
  !S3_SECRET_ACCESS_KEY
) {
  throw new Error("Unable to Authenticate");
}

const client = new S3Client({
  region: NEXT_PUBLIC_S3_BUCKET_LOCATION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadFilesToS3(userId: string, files: File[]) {
  let uploadedImages: string[] = [];
  let failedImages: File[] = [];

  uploadedImages = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const optimizedFile = await sharp(buffer)
        .webp({ quality: 70 })
        .toBuffer();
      const key = `${AWS_S3_PRODUCTION_FOLDER_NAME}/${userId}/${uuidv4()}`;

      try {
        await client.send(
          new PutObjectCommand({
            Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: key, // File Path
            Body: optimizedFile, // formData images
            ContentType: "image/webp", // Allowed types
            Metadata: {
              userId: userId,
            },
            // ["eq", "$x-amz-meta-userid", userid],
            Tagging: `userid=${userId}`,
          })
        ); // Execute AWS command

        const image = await client.send(
          new GetObjectCommand({
            Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: key,
          })
        );

        if (image) {
          return `${AWS_S3_BASE_URL}/${key}`;
        }
      } catch (error) {
        console.log("Error: ", error);
        failedImages.push(file);
        return "";
      }

      return "";
    })
  );

  return {
    uploadedImages: uploadedImages,
    failedImages: failedImages,
  };
}
