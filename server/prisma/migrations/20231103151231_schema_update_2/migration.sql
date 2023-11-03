/*
  Warnings:

  - You are about to drop the column `recipientId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `createdConversationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `joinedConversationId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_recipientId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "recipientId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdConversationId",
DROP COLUMN "joinedConversationId",
ALTER COLUMN "profilePic" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_ConversationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToUser_AB_unique" ON "_ConversationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToUser_B_index" ON "_ConversationToUser"("B");

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
