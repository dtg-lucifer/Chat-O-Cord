import { NoChatHeader, NotFoundWrapper } from "../../_styled/ConversationPage"

const ConversationPageNoActiveChat = () => {
  return (
    <NotFoundWrapper>
        <NoChatHeader>Don't know where to start? Try finding some friends and start chatting with them</NoChatHeader>
    </NotFoundWrapper>
  )
}

export default ConversationPageNoActiveChat