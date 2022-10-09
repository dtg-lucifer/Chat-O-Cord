import React from "react";
import {
  CardHeader,
  CardLastMessage,
  ChatCardContainer,
  Image,
} from "../../_styled/ConversationPage";
import { MiniChatCardProps } from "../../../types/StyledComponentProps/ConversationPage";
import { useNavigate } from "react-router-dom";

const ChatCard: React.FC<MiniChatCardProps> = ({ img, name, lastMsg, id }) => {

  const navigate = useNavigate();

  return (
    <ChatCardContainer onClick={() => navigate(`/conversations/${id}`)}>
      <Image src={img} />
      <div>
        <CardHeader>{name}</CardHeader>
        <CardLastMessage>
            {
                lastMsg && (
                  lastMsg?.length >= 30 ? `${lastMsg?.substring(0, 30)}...` : lastMsg
                )               
            }
        </CardLastMessage>
      </div>
    </ChatCardContainer>
  );
};

export default ChatCard;
