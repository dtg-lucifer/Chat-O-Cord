import React, { useEffect, useState } from "react";
import ComversationsPageNoChannel from "../../components/_general/conversation/ComversationPageNoChannel";
import ConversationPageActiveChat from "../../components/_general/conversation/_panel/ConversationPageActiveChat";
import ConversationSidebar from "../../components/_general/conversation/ConversationSidebar";
import ProfileList from "../../components/_general/conversation/_profile/ProfileList";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import { PageWrapper } from "../../components/_styled/ConversationPage";
import { ConversationPageStateProps } from "../../types/StyledComponentProps/ConversationPage";
import { useParams } from "react-router-dom";
import { Conversation } from "../../types/ComponentProps/Conversation";
import { getConversations } from "../../utils/api";

const ConversationPage: React.FC<ConversationPageStateProps> = ({
  channelActive,
}) => {
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
        <ConversationPageActiveChat
          avatar="https://github.com/dtg-lucifer/Chat-O-Cord/blob/master/dev/client/src/assets/my_pic.jpg"
          name="Piush Bose"
          sts="Coding a discord clone"
          id={parseInt(id)}
        />
      ) : (
        <ComversationsPageNoChannel />
      )}
      <ProfileList />
    </PageWrapper>
  );
};

export default ConversationPage;
