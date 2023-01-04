import React, { useEffect } from "react";
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

const ConversationPage: React.FC<ConversationPageStateProps> = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchConversationsThunk())
  }, []);

  return (
    <PageWrapper display="flex" fdirection="row" alignItems="center" gap={0}>
      <ConversationMiniSideBar />
      <ConversationSidebar />
      {id ? <ConversationPageActiveChat /> : <ConversationPageNoActiveChat />}
      {/* {id && <ProfileList />} */}
    </PageWrapper>
  );
};

export default ConversationPage;
