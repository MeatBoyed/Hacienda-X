"use server";
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

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
export default async function deleteFile(fileName: string) {
  try {
    return await deleteFileToS3(fileName);
  } catch (err) {
    console.log("Error: ", err);
    return "An Error occured";
  }
}

async function deleteFileToS3(fileName: string) {
  //   AWS PUT config
  const deleteParams: DeleteObjectCommandInput = {
    Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `/haciendaTest/${fileName}`, // File Path
  };

  try {
    const res = await client.send(new DeleteObjectCommand(deleteParams)); // Execute AWS command
    console.log("File Uploaded! - ", res);

    // Return the url (format if must)
    return "Success";
  } catch (error) {
    console.log("Error: ", error);
    return "Unable to upload to S3";
  }
}
