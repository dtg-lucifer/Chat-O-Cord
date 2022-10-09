import { ChatType } from "../../../types/Utils/ConversationsChatCard";
import { ChatDetails } from "../../../_mocks/Conversations";
import { ChatOuter, Wrapper } from "../../_styled/ConversationPage";
import ChatCard from "./ChatCard";

const ConversationChatList = () => {

  // const array: Array<string> = new Array(20).fill("")

  return (
    <Wrapper bottomLine={false}>
      {ChatDetails.map(({id, name, lastMsg}: ChatType, index) => {
        return (
          <ChatOuter key={id} arrLength={ChatDetails.length}>
            <ChatCard
              img="https://raw.githubusercontent.com/dtg-lucifer/Chat-O-Cord/main/client/src/assets/my_pic.jpg"
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
