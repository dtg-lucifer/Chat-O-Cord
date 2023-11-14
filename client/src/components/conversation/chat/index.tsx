import { FaPlus, FaSmileWink } from "react-icons/fa";
import { TextField as TextFieldCVA } from "../index.components";
import {
  ChatBottomWrapper,
  ChatSectionMainWrapper,
  ChatTopWrapper,
  ConversationWrapper,
} from "../index.styled";
import EmojiPicker, { EmojiStyle, SkinTones, Theme } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useDebouncedTyping } from "../../../utils/hooks/useDebounce";

export default function ChatSection() {
  const emojiPanelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  const { debouncedVal, isTyping } = useDebouncedTyping<string>(message, 2000);

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
    isTyping && console.log("Typing starts", debouncedVal);

    if (message && !isTyping) {
      console.log("Typing ends", debouncedVal);
    }
  }, [isTyping]);

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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
            lazyLoadEmojis={true}
            emojiStyle={EmojiStyle.APPLE}
            onEmojiClick={(e) => setMessage((prevMsg) => prevMsg + e.emoji)}
          />
        </div>
      </ChatBottomWrapper>
    </ChatSectionMainWrapper>
  );
}
