-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CategoryType" ADD VALUE 'ENERGY_STONE';
ALTER TYPE "CategoryType" ADD VALUE 'SPIRITUAL_JEWELLERY';
ALTER TYPE "CategoryType" ADD VALUE 'KARUNGALI';
ALTER TYPE "CategoryType" ADD VALUE 'VASTU';
ALTER TYPE "CategoryType" ADD VALUE 'ZODIAC';
ALTER TYPE "CategoryType" ADD VALUE 'GIFT_HAMPER';
