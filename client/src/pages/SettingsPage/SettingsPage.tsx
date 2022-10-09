import React from 'react'
import SettingsBar from "../../components/_general/sidebars/SettingsBar";
import ConversationMiniSideBar from "../../components/_general/sidebars/ConversationMiniSideBar";
import { PageWrapper } from "../../components/_styled/ConversationPage";

const SettingsPage = () => {
  return (
    <>
      <PageWrapper display="flex" fdirection="row">
        <ConversationMiniSideBar />
        <SettingsBar />
      </PageWrapper>
    </>
  );
};

export default SettingsPage