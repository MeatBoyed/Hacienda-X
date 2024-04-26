/*
  Warnings:

  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `PropertyImage` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `address` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "PropertyImage" DROP CONSTRAINT "PropertyImage_property_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_user_id_fkey";

-- AlterTable
ALTER TABLE "Ad" ALTER COLUMN "agent_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Analytics" ALTER COLUMN "agent_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "agent_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "receiver_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bathrooms" INTEGER,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "pool" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rooms" INTEGER,
ALTER COLUMN "property_id" DROP DEFAULT,
ALTER COLUMN "property_id" SET DATA TYPE TEXT,
ALTER COLUMN "agent_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id");
DROP SEQUENCE "Property_property_id_seq";

-- AlterTable
ALTER TABLE "PropertyImage" DROP COLUMN "image_url",
ADD COLUMN     "image_urls" TEXT[],
ALTER COLUMN "property_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "User_user_id_seq";

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyImage" ADD CONSTRAINT "PropertyImage_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
