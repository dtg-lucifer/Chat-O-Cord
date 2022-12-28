import React, { useContext } from "react";
import { MessageProps } from "../../../../types/ComponentProps/Message";
import { formatRelative } from "date-fns";
import {
  MessageAuthorAvatar,
  MessageAuthorName,
  MessageContainer,
  MessageContent,
  MessageCreatedAt,
  MessageHeaderContainer,
} from "../../../_styled/ConversationPage";
import myPic from "../../../../assets/my_pic.jpg";
import { AuthContext } from "../../../../utils/context/AuthContext";

const Message: React.FC<MessageProps> = ({
  id,
  author,
  content,
  createdAt,
  currentIndex,
  messages,
}) => {
  const { user } = useContext(AuthContext);

  const formattedTimeStamp: string = formatRelative(
    new Date(createdAt),
    new Date()
  );

  const isSameTimeStamp = () => {
    if (currentIndex === messages!.length - 1) return false;
    const index =
      currentIndex === messages!.length - 1 ? currentIndex : currentIndex! + 1;
    return (
      formattedTimeStamp ===
        formatRelative(new Date(messages![index].createdAt), new Date()) &&
      author._id === messages![index].author._id
    );
  };


  return (
    <MessageContainer isSameTimeStamp={isSameTimeStamp()}>
      <MessageAuthorAvatar
        src={myPic}
        alt="author_avatar"
        isSameTimeStamp={isSameTimeStamp()}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MessageHeaderContainer>
          <MessageAuthorName
            isSameTimeStamp={isSameTimeStamp()}
            style={{
              color: `${author._id === user?._id ? "#6c63ff": "#FFA800"}`,
            }}
          >
            {author?.firstName} {author?.lastName}
          </MessageAuthorName>
          <MessageCreatedAt isSameTimeStamp={isSameTimeStamp()}>
            {
              formattedTimeStamp.charAt(0).toUpperCase() +
              formattedTimeStamp.slice(1)
            }
          </MessageCreatedAt>
        </MessageHeaderContainer>
        <MessageContent isSameTimeStamp={isSameTimeStamp()}>
          {content}
        </MessageContent>
      </div>
    </MessageContainer>
  );
};

export default Message;
