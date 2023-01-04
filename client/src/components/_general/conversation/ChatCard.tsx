import React, {useContext} from "react";
import {
  CardHeader,
  CardLastMessage,
  ChatCardContainer,
  Image,
} from "../../_styled/ConversationPage";
import { MiniChatCardProps } from "../../../types/StyledComponentProps/ConversationPage";
import { useNavigate } from "react-router-dom";
import { Conversation } from "../../../types/ComponentProps/Conversation";
import { ActivechatContext } from "../../../utils/context/ActivechatContext";

const ChatCard: React.FC<MiniChatCardProps> = ({ img, name, lastMsg, id, conversation }) => {
  const navigate = useNavigate();
  const { setActiveConversation } = useContext(ActivechatContext)

  const clickHandler = (id: number, conversation: Conversation) => {
    navigate(`/conversations/${id}`);
    setActiveConversation(conversation)
    console.log(conversation)
  };

  return (
    <ChatCardContainer onClick={() => clickHandler(id, conversation)}>
      <Image src={img} />
      <div>
        <CardHeader>{name}</CardHeader>
        <CardLastMessage>
          {lastMsg &&
            (lastMsg?.length >= 30
              ? `${lastMsg?.substring(0, 30)}...`
              : lastMsg)}
        </CardLastMessage>
      </div>
    </ChatCardContainer>
  );
};

export default ChatCard;
