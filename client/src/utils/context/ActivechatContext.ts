import { createContext } from "react"
import { Conversation } from "../../types/ComponentProps/Conversation"

interface Types {
	activeConversation?: Conversation
	setActiveConversation: (data: Conversation) => void
}

export const ActivechatContext = createContext<Types>({
	setActiveConversation: () => {}
})