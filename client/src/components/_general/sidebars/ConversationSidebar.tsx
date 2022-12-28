import React, { useContext, useState } from "react";
import {
  ChatFilterButtonsContainer,
  ChatOuter,
  ShowmodalButton,
  SideBarChatButton,
  SideBarWrapper,
  Wrapper,
} from "../../_styled/ConversationPage";
import { ChatlistProps } from "../../../types/ComponentProps/ConversationPanel";
import myPic from "../../../assets/my_pic.jpg";
import ChatCard from "../conversation/ChatCard";
import CreateConversationModal from "../modals/CreateConversationModal";
import { AuthContext } from "../../../utils/context/AuthContext";
import { Conversation } from "../../../types/ComponentProps/Conversation";

const ConversationSidebar: React.FC<ChatlistProps> = ({ conversations }) => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal((prev) => !prev);
  };
  const displayUser = (conversation: Conversation) => {
    if (conversation.creator._id === user?._id) {
      return conversation.recipient._id === user?._id
        ? conversation.creator
        : conversation.recipient;
    }
    return conversation.creator;
  };

  return (
    <SideBarWrapper>
      <Wrapper bottomLine={true}>
        <ShowmodalButton onClick={clickHandler}>Search</ShowmodalButton>
      </Wrapper>
      <Wrapper bottomLine={false}>
        <ChatFilterButtonsContainer>
          <SideBarChatButton to={"?panel=dm"}>
            Direct Messages
          </SideBarChatButton>
          <SideBarChatButton to={"?panel=gc"}>Group Chats</SideBarChatButton>
        </ChatFilterButtonsContainer>
      </Wrapper>
      <Wrapper bottomLine={false}>
        {conversations.map((conv) => {
          return (
            <ChatOuter key={conv.id} arrLength={conversations.length}>
              <ChatCard
                img={myPic}
                name={`${displayUser(conv).firstName} ${
                  displayUser(conv).lastName
                }`}
                lastMsg={"Hello"}
                id={conv.id}
              />
            </ChatOuter>
          );
        })}
      </Wrapper>
      {showModal && (
        <CreateConversationModal showModal={true} setShowModal={setShowModal} />
      )}
    </SideBarWrapper>
  );
};

export default ConversationSidebar;
