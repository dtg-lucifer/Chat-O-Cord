import { Conversation } from "./Conversation";

export interface PanelHeaderProps {
    readonly avatar?: string;
    readonly name: string;
    readonly id: number;
    readonly sts?: string;
}

export interface ChatlistProps {
    conversations: Conversation[]
}