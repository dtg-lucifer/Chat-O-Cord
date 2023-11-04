import { FaPlus, FaSmileWink } from "react-icons/fa";
import { TextField as TextFieldCVA } from "../index.components";
import {
  ChatBottomWrapper,
  ChatSectionMainWrapper,
  ChatTopWrapper,
  ConversationWrapper,
} from "../index.styled";
import EmojiPicker, { SkinTones, Theme } from "emoji-picker-react";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../utils/hooks/useDebounce";

export default function ChatSection() {
  const emojiPanelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  const actualMessage = useDebounce((msg: SetStateAction<string>) => {
    setMessage(msg);
  }, 1000)

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        emojiPanelRef.current?.firstElementChild?.classList.remove(
          "emoji__wrapper__active"
        );
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  useEffect(() => {
    if (message) {
      console.log("Sending message:", message);
    }
  }, [message]);

  return (
    <ChatSectionMainWrapper>
      <ChatTopWrapper></ChatTopWrapper>
      <ConversationWrapper></ConversationWrapper>
      <ChatBottomWrapper>
        <FaPlus size={20} onClick={() => fileInputRef.current?.click()} />
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.mkv,.mp4,.mp3,.m4a,.doc,.docx,.pdf,.ppt,.pptx,.txt"
          hidden
        />
        <TextFieldCVA
          variant={"chat"}
          size={"lg"}
          placeholder="Send something"
          autoFocus
          onChange={(e) => actualMessage(e.target.value)}
        />
        <FaSmileWink
          size={20}
          onClick={() => {
            emojiPanelRef.current?.firstElementChild?.classList.toggle(
              "emoji__wrapper__active"
            );
          }}
        />
        <div
          ref={emojiPanelRef}
          className="emoji__wrapper absolute bottom-[100%] right-0"
        >
          <EmojiPicker
            theme={Theme.DARK}
            defaultSkinTone={SkinTones.NEUTRAL}
            lazyLoadEmojis
            onEmojiClick={(e) => setMessage((prevMsg) => prevMsg + e.emoji)}
          />
        </div>
      </ChatBottomWrapper>
    </ChatSectionMainWrapper>
  );
}
