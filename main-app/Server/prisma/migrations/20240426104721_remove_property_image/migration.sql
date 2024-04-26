/*
  Warnings:

  - You are about to drop the `PropertyImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PropertyImage" DROP CONSTRAINT "PropertyImage_property_id_fkey";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "PropertyImage";
