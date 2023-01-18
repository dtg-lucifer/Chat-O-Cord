import React, { useContext, useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import myPic from "../../../../assets/my_pic.jpg";
import { AppDispatch, RootState } from "../../../../store";
import {
  fetchMessagesThunk
} from "../../../../store/slices/messageSlice";
import styles from "../../../../styles/ConversationPage/ConversationPage.module.scss";
import {
  Conversation
} from "../../../../types/ComponentProps/Conversation";
import { ActivechatContext } from "../../../../utils/context/ActivechatContext";
import { AuthContext } from "../../../../utils/context/AuthContext";
import { SocketContext } from "../../../../utils/context/SocketContext";
import {
  ChatHeader,
  ConversationWrapper,
  HeaderAvatar,
  HeaderIconContainer,
  MainWrapper,
} from "../../../_styled/ConversationPage";
import ConversationInput from "../../inputs/ConversationInput";
import Message from "../messages/Message";

const ConversationPageActiveChat: React.FC = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const { activeConversation } = useContext(ActivechatContext);
  const dispatch = useDispatch<AppDispatch>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const conversationMessages = useSelector((state: RootState) => {
    return state.messages.messages;
  });

  useEffect(() => {
    dispatch(fetchMessagesThunk(parseInt(id!)));
    socket.emit("onClientConnect", { conversationID: parseInt(id!) });
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    socket.on("onTypingStart", (payload: { conversationId: number }) => {
      if (payload.conversationId === parseInt(id!)) setIsTyping(true);
    });
    socket.on("onTypingEnd", (payload: { conversationId: number }) => {
      if (payload.conversationId === parseInt(id!)) setIsTyping(false);
    });
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

  const activeChatMessages = conversationMessages.find(
    (cm) => cm.id === parseInt(id!)
  );

  const sendTypingSts = () => {
    socket.emit("onTypingStart", { conversationId: parseInt(id!) });
  };
  const sendTypingEnd = () => {
    socket.emit("onTypingEnd", { conversationId: parseInt(id!) });
  };

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
      <div
        style={{
          display: isTyping ? "block" : "none",
        }}
        className={styles.typingContainer}
      >
        {displayUser(activeConversation)?.userName} Is Typing...
      </div>
      <ConversationInput
        name={activeConversation?.recipient.userName}
        id={activeConversation?.id}
        typingSts={sendTypingSts}
        sendTypingEnd={sendTypingEnd}
      />
    </MainWrapper>
  );
};

export default ConversationPageActiveChat;
