import React from "react";
import {
  ChatFilterButtonsContainer,
  SideBarChatButton,
} from "../../_styled/ConversationPage";

const ConversationButton = () => {
  return (
    <ChatFilterButtonsContainer>
      <SideBarChatButton>Direct Messages</SideBarChatButton>
      <SideBarChatButton>Group Chats</SideBarChatButton>
    </ChatFilterButtonsContainer>
  );
};

export default ConversationButton;
