/*
  Warnings:

  - You are about to drop the column `publcUrl` on the `Attachment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "publcUrl",
ADD COLUMN     "publicUrl" TEXT;
