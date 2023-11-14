/*
  Warnings:

  - You are about to drop the `_ConversationToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ConversationToUser" DROP CONSTRAINT "_ConversationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationToUser" DROP CONSTRAINT "_ConversationToUser_B_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ConversationToUser";

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
