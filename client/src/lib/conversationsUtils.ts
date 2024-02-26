import { formatRelative } from "date-fns";
import { Message } from "../types/conversation";

const timeStamp = (msg: Message): string => {
	return formatRelative(new Date(msg.createdAt), new Date());
};

export const showTimeStampAndAvatar = (
	msg: Message,
	i: number,
	msgs: Message[]
): boolean => {
	if (i === msgs.length - 1) return true;

	const index = i === msgs.length - 1 ? i : i + 1;

	if (msg.author.id !== msgs[index].author.id) return true;

	if (
		msg.author.id === msgs[index].author.id &&
		timeStamp(msg) === timeStamp(msgs[index])
	)
		return false;

	return true;
};

export const setLocalMsgStateHelper = (messageFromApi: Message, prev: {
	convId: string;
	messages: Message[];
}[]) => {
	const foundIndex = prev.findIndex(
		(state) => state.convId === messageFromApi.conversationId
	);
	if (foundIndex !== -1) {
		const updatedState = [...prev];
		updatedState[foundIndex] = {
			convId: updatedState[foundIndex].convId,
			messages: [messageFromApi, ...updatedState[foundIndex].messages],
		};
		return updatedState;
	} else {
		return [
			...prev,
			{ convId: messageFromApi.conversationId, messages: [messageFromApi] },
		];
	}
}