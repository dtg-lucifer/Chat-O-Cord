import { FaPlus, FaSmileWink } from "react-icons/fa";
import { TextField as TextFieldCVA } from "../index.components";
import {
  ChatBottomWrapper,
  ChatSectionMainWrapper,
  ChatTopWrapper,
  ConversationWrapper,
} from "../index.styled";
import EmojiPicker, { SkinTones, Theme } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export default function ChatSection() {
  const emojiPanelRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");

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

  return (
    <ChatSectionMainWrapper>
      <ChatTopWrapper></ChatTopWrapper>
      <ConversationWrapper></ConversationWrapper>
      <ChatBottomWrapper>
        <FaPlus size={20} />
        <TextFieldCVA
          variant={"chat"}
          size={"lg"}
          placeholder="Send something"
          value={message}
          autoFocus
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
            lazyLoadEmojis
            onEmojiClick={(e) => setMessage((prevMsg) => prevMsg + e.emoji)}
          />
        </div>
      </ChatBottomWrapper>
    </ChatSectionMainWrapper>
  );
}
