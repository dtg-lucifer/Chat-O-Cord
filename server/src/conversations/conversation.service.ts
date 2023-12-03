import { CreateConversationDTO } from "./dto/conversation.dto";
import { Conversation } from "@prisma/client";

export const createConversation = async (
  payload: CreateConversationDTO
): Promise<Conversation | undefined> => {
  const user = await __db?.user.findUnique({
    where: { userName: payload.userName },
  });

  if (!user) throw new Error("User not found !!");

  if (user.id === payload.self.id)
    throw new Error("Cannot create conversation with yourself !!");

  const existingConversation = await __db?.conversation.findFirst({
    where: {
      AND: [{ creatorId: payload.self.id }, { recipientId: user.id }],
    },
  });

  if (existingConversation) throw new Error("Conversation already exists !!");

  const conversation = await __db?.conversation.create({
    data: {
      recipient: {
        connect: {
          id: user.id,
        },
      },
      creator: {
        connect: {
          id: payload.self.id,
        },
      },
    },
    include: {
      creator: true,
      recipient: true,
      messages: true,
    },
  })!;

  return conversation;
};

export const getConversation = async (payload: {
  id: string;
}): Promise<Conversation[] | null> => {
  const conversations = await __db?.conversation.findMany({
    where: {
      OR: [
        {
          recipientId: payload.id,
        },
        {
          creatorId: payload.id,
        },
      ],
    },
    include: {
      creator: true,
      recipient: true,
      messages: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return conversations ?? null;
};

export const getConversationById = async (id: string) => {
  return await __db?.conversation.findUnique({
    where: {
      id,
    },
    include: {
      creator: true,
      recipient: true,
      messages: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
