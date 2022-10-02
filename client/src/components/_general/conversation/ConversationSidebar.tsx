import React from "react";
import { SideBarWrapper } from "../../_styled/ConversationPage";
import ConversationButton from "./ConversationButton";
import ConversationChatList from "./ConversationChatList";
import ConversationTopPanel from "./ConversationTopPanel";

const ConversationSidebar = () => {
  return (
    <SideBarWrapper>
      <ConversationTopPanel />
      <ConversationButton />
      <ConversationChatList />
    </SideBarWrapper>
  );
};

export default ConversationSidebar;
