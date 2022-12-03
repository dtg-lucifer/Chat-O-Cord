import {
  ChatHeader,
  HeaderAvatar,
  HeaderIconContainer,
} from "../../../_styled/ConversationPage";
import React from "react";
import { PanelHeaderProps } from "../../../../types/ComponentProps/ConversationPanel";
import { BiPhoneCall } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import myPic from "../../../../assets/my_pic.jpg"

const ConversationPanelHeader: React.FC<PanelHeaderProps> = ({
  avatar,
  name,
  id,
  sts,
}) => {
  return (
    <ChatHeader>
      <HeaderAvatar src={myPic} alt="user-avatar" />
      <div style={{ flex: "1" }}>
        <div style={{ fontWeight: "400", fontSize: "2rem" }}>{name}</div>
        {sts && (
          <div
            style={{
              fontWeight: "400",
              color: "rgb(255 255 255 / .7)",
              fontSize: "1rem",
            }}
          >
            {sts}
          </div>
        )}
      </div>
      <HeaderIconContainer>
        <BiPhoneCall />
        <FaVideo />
      </HeaderIconContainer>
    </ChatHeader>
  );
};

export default ConversationPanelHeader;
