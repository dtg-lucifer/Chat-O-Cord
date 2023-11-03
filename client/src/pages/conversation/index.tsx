import styles from "./index.module.scss"
import { SideBar } from "../../components/conversation";
import PrimaryBar from "../../components/primarybar";
import { useParams } from "react-router-dom";
import ChatSection from "../../components/conversation/chat";
import { useEffect, useLayoutEffect } from "react";

const ConversationPage = () => {

	const { id, mode } = useParams<{id: string, mode: string}>()

	useLayoutEffect(() => {
		if (mode !== "u" && mode !== "g") {
			window.location.href = "/conversations/u"
		}
	}, [mode])

	useEffect(() => {
		// TODO: fetch conversations on mount
		// TODO: by the id in the url
		// TODO: then set that to a context
		console.log("Fetching new conversation", { id, mode })
	}, [id])

	return (
		<main className={styles.main__wrapper}>
			<PrimaryBar />
			<SideBar activeGroup={mode} activeConversationId={id} />
			<ChatSection />
		</main>
	);
};

export default ConversationPage;