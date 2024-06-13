"use server";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

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

// General Upload method
export default async function uploadFile(userId: string, file: File) {
  try {
    // Create Put formData
    const formData = new FormData();
    formData.append("Content-Type", file.type);

    // Create Buffer for sharp & streaming
    const buffer = Buffer.from(await file.arrayBuffer());

    return await uploadFileToS3(userId, buffer, file.name);
  } catch (err) {
    console.log("Error: ", err);
    return "An Error occured";
  }
}

async function uploadFileToS3(userId: string, file: Buffer, fileName: string) {
  const optimizedFile = await sharp(file).jpeg({ quality: 70 }).toBuffer();

  //   AWS PUT config
  const params: PutObjectCommandInput = {
    Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `/haciendaTest/${fileName}`, // File Path
    Body: optimizedFile, // formData images
    ContentType: "image/", // Allowed types
    // ["eq", "$x-amz-meta-userid", userid],
    Tagging: `userid=${userId}`,
  };

  try {
    const res = await client.send(new PutObjectCommand(params)); // Execute AWS command
    console.log("File Uploaded! - ", res);

    // Return the url (format if must)
    return fileName;
  } catch (error) {
    console.log("Error: ", error);
    return "Unable to upload to S3";
  }
}
