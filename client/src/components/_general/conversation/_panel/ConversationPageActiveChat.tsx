import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChatHeader,
  ConversationWrapper,
  HeaderAvatar,
  HeaderIconContainer,
  MainWrapper,
} from "../../../_styled/ConversationPage";
import ConversationInput from "../../inputs/ConversationInput";
import { AuthContext } from "../../../../utils/context/AuthContext";
import {
  getConversationByID,
  getConversationMessages,
} from "../../../../utils/api";
import { BiPhoneCall } from "react-icons/bi";
import myPic from "../../../../assets/my_pic.jpg";
import { FaVideo } from "react-icons/fa";
import {
  Conversation,
  Message as MessageType,
} from "../../../../types/ComponentProps/Conversation";
import Message from "../messages/Message";

const ConversationPageActiveChat: React.FC = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [activeChat, setActiveChat] = useState<Conversation | undefined>();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    getConversationMessages(parseInt(id!))
      .then(({ data }) => setMessages(data))
      .catch((err) => console.log(err));

    getConversationByID(parseInt(id!))
      .then(({ data }) => setActiveChat(data))
      .catch((err) => console.log(err));
  }, [id]);

  const isActiveChatRecipient = (activeChat: Conversation | undefined) => {
    return activeChat?.recipient._id === user?._id;
  };

  return (
    <MainWrapper>
      <ChatHeader>
        <HeaderAvatar src={myPic} alt="user-avatar" />
        <div style={{ flex: "1" }}>
          <div style={{ fontWeight: "400", fontSize: "2rem" }}>
            {isActiveChatRecipient(activeChat) ? activeChat?.creator.firstName : activeChat?.recipient?.firstName}{" "}
            {isActiveChatRecipient(activeChat) ? activeChat?.creator.lastName : activeChat?.recipient?.lastName}
          </div>
        </div>
        <HeaderIconContainer>
          <BiPhoneCall />
          <FaVideo />
        </HeaderIconContainer>
      </ChatHeader>
      <ConversationWrapper>
        {messages.map((msg, i, msgs) => {
          return (
            <Message
              key={msg.id}
              recipient={activeChat?.recipient}
              currentIndex={i}
              messages={msgs}
              {...msg}
            />
          );
        })}
      </ConversationWrapper>
      <ConversationInput
        name={activeChat?.recipient.userName}
        id={activeChat?.recipient._id}
      />
    </MainWrapper>
  );
};

export default ConversationPageActiveChat;
