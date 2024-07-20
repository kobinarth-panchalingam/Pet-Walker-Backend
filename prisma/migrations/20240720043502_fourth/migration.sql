/*
  Warnings:

  - You are about to drop the `EmergencyContact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmergencyContact" DROP CONSTRAINT "EmergencyContact_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emergencyContacts" JSONB[];

-- DropTable
DROP TABLE "EmergencyContact";
