"use server";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import {
  AWS_S3_BASE_URL,
  AWS_S3_PRODUCTION_FOLDER_NAME,
} from "../(utils)/utils";

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
// export default async function uploadFile(userId: string, file: File) {
//   try {
//     // Create Put formData
//     const formData = new FormData();
//     formData.append("Content-Type", file.type);

//     // Create Buffer for sharp & streaming
//     const buffer = Buffer.from(await file.arrayBuffer());

//     return await uploadFileToS3(userId, buffer, file.name);
//   } catch (err) {
//     console.log("Error: ", err);
//     return "An Error occured";
//   }
// }

// export async function uploadFileToS3(userId: string, file: File) {
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const optimizedFile = await sharp(buffer).webp({ quality: 70 }).toBuffer();

//   //   AWS PUT config
//   const params: PutObjectCommandInput = {
//     Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
//     Key: `${AWS_S3_PRODUCTION_FOLDER_NAME}/${file.name}`, // File Path
//     Body: optimizedFile, // formData images
//     ContentType: "image/webp", // Allowed types
//     Metadata: {
//       userId: userId,
//     },
//     // ["eq", "$x-amz-meta-userid", userid],
//     Tagging: `userid=${userId}`,
//   };

//   try {
//     const res = await client.send(new PutObjectCommand(params)); // Execute AWS command
//     console.log("File Uploaded! - ", res);

//     // Return the url (format if must)
//     return `${AWS_S3_BASE_URL}/${AWS_S3_PRODUCTION_FOLDER_NAME}/${file.name}`;
//   } catch (error) {
//     console.log("Error: ", error);
//     return "Unable to upload to S3";
//   }
// }

export async function uploadFilesToS3(userId: string, files: File[]) {
  let uploadedImages: string[] = [];

  files.forEach(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const optimizedFile = await sharp(buffer).webp({ quality: 70 }).toBuffer();

    //   AWS PUT config
    const params: PutObjectCommandInput = {
      Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `${AWS_S3_PRODUCTION_FOLDER_NAME}/${file.name}`, // File Path
      Body: optimizedFile, // formData images
      ContentType: "image/webp", // Allowed types
      Metadata: {
        userId: userId,
      },
      // ["eq", "$x-amz-meta-userid", userid],
      Tagging: `userid=${userId}`,
    };

    try {
      const res = await client.send(new PutObjectCommand(params)); // Execute AWS command
      console.log("File Uploaded! - ", res);

      // Return the url (format if must)
      // return `${AWS_S3_BASE_URL}/${AWS_S3_PRODUCTION_FOLDER_NAME}/${file.name}`;
      uploadedImages.push(
        `${AWS_S3_BASE_URL}/${AWS_S3_PRODUCTION_FOLDER_NAME}/${file.name}`
      );
    } catch (error) {
      console.log("Error: ", error);
      // return "Unable to upload to S3";
      return undefined;
    }
  });

  return uploadedImages;
}
