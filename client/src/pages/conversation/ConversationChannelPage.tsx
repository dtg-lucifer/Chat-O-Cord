import React from "react";
import { useParams } from "react-router-dom";
import { MainWrapper } from "../../components/_styled/ConversationPage";

const ConversationChannelPage = () => {
  const { id } = useParams();

  return <MainWrapper>The id of ther channel is: {id}</MainWrapper>;
};

export default ConversationChannelPage;
