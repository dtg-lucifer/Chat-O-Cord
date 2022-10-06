import React from "react";
import ComversationsPageNoChannel from "../../components/_general/conversation/ComversationPageNoChannel";
import ConversationPageActiveChat from "../../components/_general/conversation/ConversationPageActiveChat";
import ConversationSidebar from "../../components/_general/conversation/ConversationSidebar";
import ProfileList from "../../components/_general/conversation/ProfileList";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import { PageWrapper } from "../../components/_styled/ConversationPage";
import { ConversationPageStateProps } from "../../types/StyledComponentProps/ConversationPage";

const ConversationPage: React.FC<ConversationPageStateProps> = ({ channelActive }) => {
    return (
        <PageWrapper display="flex" fdirection="row" alignItems="center" gap={0}>
            <ConversationMiniSideBar />
            <ConversationSidebar />
            {channelActive ? <ConversationPageActiveChat /> : <ComversationsPageNoChannel /> }
            <ProfileList />
        </PageWrapper>
    );
};

export default ConversationPage;
