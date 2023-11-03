import { createContext } from "react";
import { Conversation } from "../../types/conversation";

interface ActiveChatContextType {
	activeChat: Conversation | null;
	setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
}

export const ActiveChatContext = createContext<ActiveChatContextType>({
	activeChat: null,
	setActiveChat: () => {},
});