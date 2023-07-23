import React, { useEffect, useContext } from "react";
import ConversationPageNoActiveChat from "../../components/_general/conversation/ConversationPageNoAvtiveChat";
import ConversationPageActiveChat from "../../components/_general/conversation/_panel/ConversationPageActiveChat";
import ConversationSidebar from "../../components/_general/sidebars/ConversationSidebar";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import { PageWrapper } from "../../components/_styled/ConversationPage";
import { ConversationPageStateProps } from "../../types/StyledComponentProps/ConversationPage";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchConversationsThunk } from "../../store/slices/conversationSlice";
import { ActivechatContext } from "../../utils/context/ActivechatContext";

const ConversationPage: React.FC<ConversationPageStateProps> = () => {
  const { id } = useParams();
  const { setActiveConversation } = useContext(ActivechatContext);
  const dispatch = useDispatch<AppDispatch>();

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
