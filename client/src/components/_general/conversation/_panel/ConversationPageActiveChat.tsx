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
import { BiPhoneCall } from "react-icons/bi";
import myPic from "../../../../assets/my_pic.jpg";
import { FaVideo } from "react-icons/fa";
import {
  Conversation,
  CreateMessagePayload
} from "../../../../types/ComponentProps/Conversation";
import Message from "../messages/Message";
import { SocketContext } from "../../../../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { addMessage, fetchMessagesThunk } from "../../../../store/slices/messageSlice";
import { ActivechatContext } from "../../../../utils/context/ActivechatContext";
import { updateLastMessage } from "../../../../store/slices/conversationSlice";
import styles from "../../../../styles/ConversationPage/ConversationPage.module.scss"

const ConversationPageActiveChat: React.FC = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const { activeConversation } = useContext(ActivechatContext)
  const dispatch = useDispatch<AppDispatch>();
  const [ isTyping, setIsTyping ] = useState<boolean>(false)
  const conversationMessages = useSelector((state: RootState) => {
    return state.messages.messages
  })

  useEffect(() => {
    dispatch(fetchMessagesThunk(parseInt(id!)))
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    socket.on("connect", () => console.log("New connection"));
    socket.on("createMessage", (payload: CreateMessagePayload) => {
      const { conversation, ...message } = payload;
      dispatch(addMessage({
        id: conversation.id,
        message: message
      }))
      dispatch(updateLastMessage(payload))
    });
    return () => {
      socket.off("connect");
      socket.off("createMessage");
    };
    // eslint-disable-next-line
  }, [socket]);

  const displayUser = (conversation: Conversation | undefined) => {
    if (conversation?.creator._id === user?._id) {
      return conversation?.recipient._id === user?._id
        ? conversation?.creator
        : conversation?.recipient;
    }
    return conversation?.creator;
  };

  const activeChatMessages = conversationMessages.find((cm) => cm.id === parseInt(id!))

  const sendTypingSts = () => {
    socket.emit("onTyping", { conversationId: parseInt(id!) })
  }
  
  return (
    <MainWrapper>
      <ChatHeader>
        <HeaderAvatar src={myPic} alt="user-avatar" />
        <div style={{ flex: "1" }}>
          <div style={{ fontWeight: "400", fontSize: "2rem" }}>
            {displayUser(activeConversation)?.firstName}{" "}
            {displayUser(activeConversation)?.lastName}
          </div>
        </div>
        <HeaderIconContainer>
          <BiPhoneCall />
          <FaVideo />
        </HeaderIconContainer>
      </ChatHeader>
      <ConversationWrapper>
        {activeChatMessages?.messages.map((msg, i, msgs) => {
            return (
              <Message
                key={msg.id}
                recipient={activeConversation?.recipient}
                currentIndex={i}
                messages={msgs}
                {...msg}
              />
            );
          })}
      </ConversationWrapper>
      <div style={{
        display: isTyping ? "block" : "none"
      }} className={styles.typingContainer}>Typing...</div>
      <ConversationInput
        name={activeConversation?.recipient.userName}
        id={activeConversation?.id}
        typingSts={sendTypingSts}
      />
    </MainWrapper>
  );
};

export default ConversationPageActiveChat;
