import React from "react";
import { ChatOuter, Wrapper } from "../../_styled/ConversationPage";
import ChatCard from "./ChatCard";

const ConversationChatList = () => {

  const array: Array<string> = new Array(20).fill("")

  return (
    <Wrapper bottomLine={false}>
      {array.map((_, i) => {
        return (
          <ChatOuter key={i} arrLength={array.length}>
            <ChatCard
              img="https://raw.githubusercontent.com/dtg-lucifer/Chat-O-Cord/main/client/src/assets/my_pic.jpg"
              name="Piush Bose"
              lastMsg="This is the message which you will see in the card bottom, which represents the last message sent or received to the user."
            />
          </ChatOuter>
        );
      })}
    </Wrapper>
  );
};

export default ConversationChatList;
