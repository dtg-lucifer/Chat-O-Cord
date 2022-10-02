import React from "react";
import { SearhBar, Wrapper } from "../../_styled/ConversationPage";

const ConversationTopPanel = () => {
  return (
    <Wrapper bottomLine={true}>
      <SearhBar placeholder="Search here...." />
    </Wrapper>
  );
};

export default ConversationTopPanel;
