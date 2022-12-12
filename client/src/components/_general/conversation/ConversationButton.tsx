import {
  ChatFilterButtonsContainer,
  SideBarChatButton,
} from "../../_styled/ConversationPage";

const ConversationButton = () => {
  return (
    <ChatFilterButtonsContainer>
      <SideBarChatButton to={"?panel=dm"}>Direct Messages</SideBarChatButton>
      <SideBarChatButton to={"?panel=gc"}>Group Chats</SideBarChatButton>
    </ChatFilterButtonsContainer>
  );
};

export default ConversationButton;
