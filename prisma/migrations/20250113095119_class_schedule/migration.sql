/*
  Warnings:

  - Added the required column `courseScheduleType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClassSchedule" AS ENUM ('weekend', 'weekday');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "courseSchedule" TIMESTAMP(3)[],
ADD COLUMN     "courseScheduleType" "ClassSchedule" NOT NULL DEFAULT 'weekday';
