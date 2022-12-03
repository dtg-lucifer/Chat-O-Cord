import { ChatType } from "../../../types/Utils/ConversationsChatCard";
import { ChatDetails } from "../../../_mocks/Conversations";
import { ChatOuter, Wrapper } from "../../_styled/ConversationPage";
import myPic from "../../../assets/my_pic.jpg"
import ChatCard from "./ChatCard";

const ConversationChatList = () => {

  // const array: Array<string> = new Array(20).fill("")

  return (
    <Wrapper bottomLine={false}>
      {ChatDetails.map(({id, name, lastMsg}: ChatType) => {
        return (
          <ChatOuter key={id} arrLength={ChatDetails.length}>
            <ChatCard
              img={myPic}
              name={name}
              lastMsg={lastMsg}
              id={id}
            />
          </ChatOuter>
        );
      })}
    </Wrapper>
  );
};

export default ConversationChatList;
