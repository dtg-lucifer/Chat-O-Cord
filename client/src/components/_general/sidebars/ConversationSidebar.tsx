import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import myPic from "../../../assets/my_pic.jpg";
import { RootState } from "../../../store";
import { Conversation } from "../../../types/ComponentProps/Conversation";
import { AuthContext } from "../../../utils/context/AuthContext";
import {
  ChatFilterButtonsContainer,
  ChatOuter,
  ShowmodalButton,
  SideBarChatButton,
  SideBarWrapper,
  Wrapper,
} from "../../_styled/ConversationPage";
import ChatCard from "../conversation/ChatCard";
import CreateConversationModal from "../modals/CreateConversationModal";

const ConversationSidebar: React.FC<{}> = () => {
  
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const conversations = useSelector((state: RootState) => {
    return state.conversation.conversations;
  });

  const messages = useSelector((state: RootState) => {
    return state.messages.messages;
  });

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
          const lastMsg = messages.find(
            msg => msg.id === conv.id
          );
          return (
            <ChatOuter key={conv.id}>
              <ChatCard
                img={myPic}
                name={`${displayUser(conv).firstName} ${
                  displayUser(conv).lastName
                }`}
                lastMsg={lastMsg?.messages[0].content ? lastMsg?.messages[0].content : "Click to see messages"}
                id={conv.id}
                conversation={conv}
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
