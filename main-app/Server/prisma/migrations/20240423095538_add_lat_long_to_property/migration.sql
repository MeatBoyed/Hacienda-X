-- CreateEnum
CREATE TYPE "Role" AS ENUM ('agent', 'user');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscription_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "plan_type" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "Property" (
    "property_id" SERIAL NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "PropertyImage" (
    "image_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_description" TEXT,

    CONSTRAINT "PropertyImage_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "message_id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "message_content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "analytics_id" SERIAL NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "graph_type" TEXT NOT NULL,
    "data_points" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("analytics_id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "ad_id" SERIAL NOT NULL,
    "agent_id" INTEGER NOT NULL,
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
    "agent_id" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

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
