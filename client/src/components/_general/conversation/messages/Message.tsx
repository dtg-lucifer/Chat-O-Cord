import React, { useContext } from "react";
import { MessageProps } from "../../../../types/ComponentProps/Message";
import {
  MessageAuthorAvatar,
  MessageAuthorName,
  MessageContainer,
  MessageContent,
  MessageCreatedAt,
  MessageHeaderContainer,
} from "../../../_styled/ConversationPage";
import myPic from "../../../../assets/my_pic.jpg";

const Message: React.FC<MessageProps> = ({
  id,
  author,
  content,
  createdAt,
  // recipient,
  // currentIndex,
  // messages
}) => {
  // const isSameTimeStamp = (t1: string, t2: string) => {
  //   const newT1 = t1.slice(-10, -8)
  //   const newT2 = t2.slice(-10, -8)

  //   return newT1 === newT2
  // }

  return (
    <MessageContainer key={id}>
      <MessageAuthorAvatar src={myPic} alt="author_avatar" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MessageHeaderContainer>
          <MessageAuthorName>
            {author?.firstName} {author?.lastName}
          </MessageAuthorName>
          <MessageCreatedAt>{createdAt}</MessageCreatedAt>
        </MessageHeaderContainer>
        <MessageContent>{content}</MessageContent>
      </div>
    </MessageContainer>
  );
};

export default Message;
