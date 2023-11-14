/*
  Warnings:

  - You are about to drop the column `userId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `recipientId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_authorId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "userId",
ADD COLUMN     "recipientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
