/*
  Warnings:

  - You are about to drop the column `batteryLevel` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the column `batteryVoltage` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the column `casingPressure` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the column `downholePressure` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the column `downholeTemp` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the column `flowLinePressure` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the column `flowLineTemp` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the column `tubingHeadPressure` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the column `wellKey` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the `Well` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `meterKey` to the `Reading` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reading" DROP CONSTRAINT "Reading_wellKey_fkey";

-- AlterTable
ALTER TABLE "Reading" DROP COLUMN "batteryLevel",
DROP COLUMN "batteryVoltage",
DROP COLUMN "casingPressure",
DROP COLUMN "downholePressure",
DROP COLUMN "downholeTemp",
DROP COLUMN "flowLinePressure",
DROP COLUMN "flowLineTemp",
DROP COLUMN "tubingHeadPressure",
DROP COLUMN "wellKey",
ADD COLUMN     "energySuppliedToday" DECIMAL,
ADD COLUMN     "frequency" DECIMAL,
ADD COLUMN     "meterKey" TEXT NOT NULL,
ADD COLUMN     "phaseACurrent" DECIMAL,
ADD COLUMN     "phaseAVoltage" DECIMAL,
ADD COLUMN     "phaseBCurrent" DECIMAL,
ADD COLUMN     "phaseBVoltage" DECIMAL,
ADD COLUMN     "phaseCCurrent" DECIMAL,
ADD COLUMN     "phaseCVoltage" DECIMAL,
ADD COLUMN     "powerFactor" DECIMAL;

-- DropTable
DROP TABLE "Well";

-- CreateTable
CREATE TABLE "Meter" (
    "id" TEXT NOT NULL,
    "meterId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meter_meterId_key" ON "Meter"("meterId");

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_meterKey_fkey" FOREIGN KEY ("meterKey") REFERENCES "Meter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
