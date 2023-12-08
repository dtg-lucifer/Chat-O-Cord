import { getConversationById } from "../conversations/conversation.service";
import { CreateMessageDTO } from "./dto/message.dto";

export const getMessages = async (id: string, limit: number) => {

  const congversation = await getConversationById(id);

  if (!congversation) throw new Error("Conversation not found!");

  return await __db?.message.findMany({
    where: {
      conversationId: id,
    },
    include: {
      attachment: true,
      author: true,
      conversation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
};

export const createMessage = async (data: CreateMessageDTO) => {
  const { content, conversationId, user } = data;
  const conversation = await getConversationById(conversationId);

  if (!conversation) throw new Error("Conversation not found!");

  const message = await __db?.message.create({
    include: {
      attachment: true,
      author: true,
      conversation: true,
    },
    data: {
      content,
      author: {
        connect: {
          id: user.id,
        }
      },
      conversation: {
        connect: {
          id: conversationId,
        }
      },
    }
  })

  return message;
};