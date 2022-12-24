import React, { useEffect, useState } from "react";
import ConversationPageNoActiveChat from "../../components/_general/conversation/ConversationPageNoAvtiveChat";
import ConversationPageActiveChat from "../../components/_general/conversation/_panel/ConversationPageActiveChat";
import ConversationSidebar from "../../components/_general/sidebars/ConversationSidebar";
import ProfileList from "../../components/_general/conversation/_profile/ProfileList";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import { PageWrapper } from "../../components/_styled/ConversationPage";
import { ConversationPageStateProps } from "../../types/StyledComponentProps/ConversationPage";
import { useParams } from "react-router-dom";
import { Conversation } from "../../types/ComponentProps/Conversation";
import { getConversations } from "../../utils/api";

const ConversationPage: React.FC<ConversationPageStateProps> = () => {
  const { id } = useParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    getConversations()
      .then(({ data }) => {
        console.log(data);
        setConversations(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PageWrapper display="flex" fdirection="row" alignItems="center" gap={0}>
      <ConversationMiniSideBar />
      <ConversationSidebar conversations={conversations} />
      {id ? (
        <ConversationPageActiveChat />
      ) : (
        <ConversationPageNoActiveChat />
      )}
      {id && <ProfileList />}
    </PageWrapper>
  );
};

export default ConversationPage;
