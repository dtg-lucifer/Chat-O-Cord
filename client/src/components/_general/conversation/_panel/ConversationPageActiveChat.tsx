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
  CreateMessagePayload,
  Message as MessageType,
} from "../../../../types/ComponentProps/Conversation";
import Message from "../messages/Message";
import { SocketContext } from "../../../../utils/context/SocketContext";

const ConversationPageActiveChat: React.FC = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext)
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


  useEffect(() => {
    socket.on("connect", () => console.log("New connection"))
    socket.on("createMessage", (payload: CreateMessagePayload) => {
      const { conversation, ...message } = payload
      setMessages(prev => [message, ...prev])
      console.log("Message received")
    })
    return () => {
      socket.off("connect")
      socket.off("createMessage")
    }
  }, [socket])

  const displayUser = (conversation: Conversation | undefined) => {
    if (conversation?.creator._id === user?._id) {
      return conversation?.recipient._id === user?._id
        ? conversation?.creator
        : conversation?.recipient;
    }
    return conversation?.creator;
  };

  return (
    <MainWrapper>
      <ChatHeader>
        <HeaderAvatar src={myPic} alt="user-avatar" />
        <div style={{ flex: "1" }}>
          <div style={{ fontWeight: "400", fontSize: "2rem" }}>
            {displayUser(activeChat)?.firstName}{" "}
            {displayUser(activeChat)?.lastName}
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
