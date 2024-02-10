import { getConversationById } from "../conversations/conversation.service";
import { CreateMessageDTO } from "./dto/message.dto";

export const getMessages = async (id: string, limit: number) => {
  const congversation = await getConversationById(id);

  if (!congversation) throw new Error("Conversation not found!");

  const messages = await __db?.message.findMany({
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

  return { id, messages };
};

export const createMessage = async (data: CreateMessageDTO) => {
  const { content, conversationId, user } = data;
  const conversation = await getConversationById(conversationId);

  if (!conversation) throw new Error("Conversation not found!");

  await __db?.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      lastMessageContent: content,
      updatedAt: new Date(),
    },
  });

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
        },
      },
      conversation: {
        connect: {
          id: conversationId,
        },
      },
    },
  });

  return message;
};

export const createMessageWithAsset = async (
  data: CreateMessageDTO & { file: Express.Multer.File }
) => {
  const { content, conversationId, user, file } = data;
  const conversation = await getConversationById(conversationId);

  if (!conversation) throw new Error("Conversation not found!");

  await __db?.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      lastMessageContent: content,
      updatedAt: new Date(),
    },
  });

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
        },
      },
      conversation: {
        connect: {
          id: conversationId,
        },
      },
    },
  });

  const attachment = await __db?.attachment.create({
    data: {
      blob: file.buffer,
      fileName: file.originalname,
      mimeType: file.mimetype,
      message: {
        connect: {
          id: message!.id,
        },
      },
    },
    include: {
      message: true,
    },
  });

  return { message, attachment };
};
