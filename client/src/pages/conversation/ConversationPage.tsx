import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ConversationPageNoActiveChat from "../../components/_general/conversation/ConversationPageNoAvtiveChat";
import ConversationPageActiveChat from "../../components/_general/conversation/_panel/ConversationPageActiveChat";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import ConversationSidebar from "../../components/_general/sidebars/ConversationSidebar";
import { PageWrapper } from "../../components/_styled/ConversationPage";
import { AppDispatch } from "../../store";
import { fetchConversationsThunk, updateLastMessage } from "../../store/slices/conversationSlice";
import { ConversationPageStateProps } from "../../types/StyledComponentProps/ConversationPage";
import { ActivechatContext } from "../../utils/context/ActivechatContext";
import { addMessage } from "../../store/slices/messageSlice";
import { CreateMessagePayload } from "../../types/ComponentProps/Conversation";
import { SocketContext } from "../../utils/context/SocketContext";

const ConversationPage: React.FC<ConversationPageStateProps> = () => {
  const { id } = useParams();
  const { setActiveConversation } = useContext(ActivechatContext);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("createMessage", (payload: CreateMessagePayload) => {
      const { conversation, ...message } = payload;
      dispatch(
        addMessage({
          id: conversation.id,
          message: message,
        })
      );
      dispatch(updateLastMessage(payload));
    });
    return () => {
      socket.off("createMessage");
      socket.off("onTypingStart");
      socket.off("onTypingEnd");
    };
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    dispatch(fetchConversationsThunk())
      .unwrap()
      .then(({ data }) => {
        const c = data.find((c) => c.id === parseInt(id!));
        c && setActiveConversation(c);
        console.log("Active Chat",c);
      })
      .catch((err) => console.log("ConversationPage", err));
    // eslint-disable-next-line
  }, [id]);

  return (
    <PageWrapper display="flex" fdirection="row" alignItems="center" gap={0}>
      <ConversationMiniSideBar />
      <ConversationSidebar />
      {id ? <ConversationPageActiveChat /> : <ConversationPageNoActiveChat />}
    </PageWrapper>
  );
};

export default ConversationPage;
