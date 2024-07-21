/*
  Warnings:

  - The `preferredWalkingSchedule` column on the `PetDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `specialRequirements` column on the `PetDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dietaryRestrictions` column on the `PetDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `behavioralTraits` column on the `PetDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `spayedNeutered` on the `PetDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vaccinated` on the `PetDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energyLevel` on the `PetDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PetDetails" DROP COLUMN "spayedNeutered",
ADD COLUMN     "spayedNeutered" JSONB NOT NULL,
DROP COLUMN "vaccinated",
ADD COLUMN     "vaccinated" JSONB NOT NULL,
DROP COLUMN "energyLevel",
ADD COLUMN     "energyLevel" JSONB NOT NULL,
DROP COLUMN "preferredWalkingSchedule",
ADD COLUMN     "preferredWalkingSchedule" JSONB[],
DROP COLUMN "specialRequirements",
ADD COLUMN     "specialRequirements" JSONB,
DROP COLUMN "dietaryRestrictions",
ADD COLUMN     "dietaryRestrictions" JSONB,
DROP COLUMN "behavioralTraits",
ADD COLUMN     "behavioralTraits" JSONB;

-- DropEnum
DROP TYPE "EnergyLevel";

-- DropEnum
DROP TYPE "WalkingSchedule";

-- DropEnum
DROP TYPE "YesNo";
