import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConversationPageNoActiveChat from "../../components/_general/conversation/ConversationPageNoAvtiveChat";
import ConversationPageActiveChat from "../../components/_general/conversation/_panel/ConversationPageActiveChat";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import ConversationSidebar from "../../components/_general/sidebars/ConversationSidebar";
import { PageWrapper } from "../../components/_styled/ConversationPage";
import { AppDispatch } from "../../store";
import { addConversation, fetchConversationsThunk, updateConversation } from "../../store/slices/conversationSlice";
import { addMessage } from "../../store/slices/messageSlice";
import { Conversation, CreateMessagePayload } from "../../types/ComponentProps/Conversation";
import { ConversationPageStateProps } from "../../types/StyledComponentProps/ConversationPage";
import { ActivechatContext } from "../../utils/context/ActivechatContext";
import { SocketContext } from "../../utils/context/SocketContext";

const ConversationPage: React.FC<ConversationPageStateProps> = () => {
  const { id } = useParams();
  const { setActiveConversation } = useContext(ActivechatContext);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("createMessage", (payload: CreateMessagePayload) => {
      const { conversation, ...message } = payload;
      dispatch(
        addMessage({
          id: conversation.id,
          message: message,
        })
      );
      dispatch(updateConversation(payload));
    });
    socket.on("onCreateConversation", (payload: Conversation) => {
      dispatch(addConversation(payload));
      console.log("onCreateConversation", payload);
      navigate(`/conversations/${payload.id}`);
    })

    return () => {
      socket.off("createMessage");
      socket.off("onCreateConversation");
    };
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    dispatch(fetchConversationsThunk())
      .unwrap()
      .then(({ data }) => {
        const c = data.find((c) => c.id === parseInt(id!));
        c && setActiveConversation(c);
        console.log("Active Chat", c);
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
