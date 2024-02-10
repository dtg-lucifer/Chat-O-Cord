/*
  Warnings:

  - You are about to drop the column `data` on the `Attachment` table. All the data in the column will be lost.
  - Added the required column `blob` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "data",
ADD COLUMN     "blob" BYTEA NOT NULL;
