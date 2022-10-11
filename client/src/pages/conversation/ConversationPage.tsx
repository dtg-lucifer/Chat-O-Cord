import React from "react";
import ComversationsPageNoChannel from "../../components/_general/conversation/ComversationPageNoChannel";
import ConversationPageActiveChat from "../../components/_general/conversation/_panel/ConversationPageActiveChat";
import ConversationSidebar from "../../components/_general/conversation/ConversationSidebar";
import ProfileList from "../../components/_general/conversation/_profile/ProfileList";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import { PageWrapper } from "../../components/_styled/ConversationPage";
import { ConversationPageStateProps } from "../../types/StyledComponentProps/ConversationPage";

const ConversationPage: React.FC<ConversationPageStateProps> = ({ channelActive }) => {
    return (
        <PageWrapper display="flex" fdirection="row" alignItems="center" gap={0}>
            <ConversationMiniSideBar />
            <ConversationSidebar />
            {channelActive ? <ConversationPageActiveChat 
                avatar="https://raw.githubusercontent.com/dtg-lucifer/Chat-O-Cord/master/dev/client/src/assets/my_pic.jpg"
                name="Piush Bose"
                sts="Coding a discord clone"
                id={1}
            /> : <ComversationsPageNoChannel /> }
            <ProfileList />
        </PageWrapper>
    );
};

export default ConversationPage;
