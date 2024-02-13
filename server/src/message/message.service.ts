import { getConversationById } from "../conversations/conversation.service";
import { v2 as cloudinary } from "cloudinary";
import { bufferToSrc, getDataUri } from "../lib/utils";
import { CreateMessageDTO } from "./dto/message.dto";

export const getMessages = async (id: string, limit: number) => {
  const congversation = await getConversationById(id);

  if (!congversation) throw new Error("Conversation not found!");

  const messages = await __db?.message.findMany({
    where: {
      conversationId: id,
    },
    include: {
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

  const fileDataUri = getDataUri(file);
  const { secure_url } = await cloudinary.uploader.upload(fileDataUri!, {
    folder: "chatapp",
    resource_type: "auto",
    use_asset_folder_as_public_id_prefix: true,
  });
  const attachmentSrc = bufferToSrc()(file.buffer, file.mimetype);

  const attachment = await __db?.attachment.create({
    data: {
      blob: file.buffer,
      fileName: file.originalname,
      mimeType: file.mimetype,
      publicUrl: secure_url,
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

  await __db?.message.update({
    where: {
      id: message!.id,
    },
    data: {
      attachmentSrc: secure_url,
    },
  });

  return { message, attachment, secureUrl: secure_url, attachmentSrc };
};
