import React from "react";
import ConversationSidebar from "../../components/_general/conversation/ConversationSidebar";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import { PageWrapper } from "../../components/_styled/ConversationPage";

const ConversationPage = () => {
    return (
        <PageWrapper display="flex" fdirection="row" alignItems="center" gap={0}>
            <ConversationMiniSideBar />
            <ConversationSidebar />
        </PageWrapper>
    );
};

export default ConversationPage;
