import { NoChatHeader, NoChatImage, NotFoundWrapper } from "../../_styled/ConversationPage"
import imgSrc from "../../../assets/chat-svgrepo-com.svg"

const ComversationsPageNoChannel = () => {
  return (
    <NotFoundWrapper>
        <NoChatImage src={imgSrc} alt="no chat pic" loading="lazy" />
        <NoChatHeader>Don't know where to start? Try finding some friends and start chatting with them</NoChatHeader>
    </NotFoundWrapper>
  )
}

export default ComversationsPageNoChannel