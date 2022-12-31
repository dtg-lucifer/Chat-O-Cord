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
import ProfileList from "../../components/_general/conversation/_profile/ProfileList";

const ConversationPage: React.FC<ConversationPageStateProps> = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchConversationsThunk())
      .unwrap()
      .then(({ data }) => {
        console.log("Fetch Conversations From REDUX-THUNK", data)
      })
      .catch((err) => console.log(err));
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
