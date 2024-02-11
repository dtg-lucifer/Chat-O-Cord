import { Message } from "../../types/conversation";

export const useBufferToImageSrc = () => {
  return (msg: Message) => {
    let base64String = "";

    if (
      msg.attachment &&
      msg.attachment.blob &&
      typeof window !== "undefined"
    ) {
      // @ts-ignore
      const uint8Array = new Uint8Array(msg.attachment.blob.data);
      const binaryString = uint8Array.reduce(
        (acc, byte) => acc + String.fromCharCode(byte),
        ""
      );
      base64String = window.btoa(binaryString);
    }

    const src = `data:${msg.attachment?.mimeType};base64,${base64String}`;

    return src;
  };
};
