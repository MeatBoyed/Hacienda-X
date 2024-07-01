-- CreateEnum
CREATE TYPE "Role" AS ENUM ('agent', 'user', 'viewer', 'admin', 'dev');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('Public', 'Private', 'Draft', 'Deleted');

-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('Sale', 'Rent', 'Auction');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "role" "Role" NOT NULL DEFAULT 'viewer',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id","public_id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscription_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "plan_type" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "Property" (
    "property_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "pool" BOOLEAN NOT NULL DEFAULT false,
    "extraFeatures" TEXT[],
    "squareMeter" INTEGER,
    "images" TEXT[],
    "saleType" "SaleType" NOT NULL,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "Visibility" NOT NULL DEFAULT 'Public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "property_id" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "lead_id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT,
    "agent_id" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("lead_id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "analytics_id" SERIAL NOT NULL,
    "agent_id" TEXT NOT NULL,
    "graph_type" TEXT NOT NULL,
    "data_points" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("analytics_id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "ad_id" SERIAL NOT NULL,
    "agent_id" TEXT NOT NULL,
    "ad_title" TEXT NOT NULL,
    "ad_content" TEXT NOT NULL,
    "ad_type" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("ad_id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoice_id" SERIAL NOT NULL,
    "agent_id" TEXT NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "invoice_amount" DOUBLE PRECISION NOT NULL,
    "payment_status" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3),

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "PropertyCategory" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "parent_category_id" INTEGER,

    CONSTRAINT "PropertyCategory_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Language" (
    "language_id" SERIAL NOT NULL,
    "language_name" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("language_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_public_id_key" ON "User"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_property_id_key" ON "Address"("property_id");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "User"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
