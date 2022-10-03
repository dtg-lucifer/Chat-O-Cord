export type PageWrapperProps = Partial<{
    readonly display: string;
    readonly fdirection: string;
    readonly justifyContent: string;
    readonly alignItems: string;
    readonly gap: number;
}>

export interface SIdeBarProps {
    readonly bottomLine: boolean;
}

export interface MiniChatCardProps {
    readonly img: string;
    readonly name: string;
    readonly lastMsg: string;
}

export interface ChatCardOuterProps {
    readonly key: number;
    readonly arrLength: number;
}