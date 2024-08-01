/*
  Warnings:

  - Changed the type of `plan_type` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `payment_status` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('Pending', 'Trail', 'Enterprise', 'Pro', 'Basic');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Paid', 'Unpaid');

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "plan_type",
ADD COLUMN     "plan_type" "PlanType" NOT NULL,
DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL;
