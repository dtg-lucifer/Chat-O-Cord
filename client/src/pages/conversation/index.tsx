import styles from "./index.module.scss"
import { SideBar } from "../../components/conversation";
import PrimaryBar from "../../components/primarybar";
import { useLocation, useParams } from "react-router-dom";

const ConversationPage = () => {

	const { id } = useParams<{id: string}>()
	console.log("Currently in this id:", id)
	
	const { pathname } = useLocation()
	const isGroup = pathname.split("/")[2] === "g"
	const isUser = pathname.split("/")[2] === "u"

	console.log("isGroup:", isGroup)
	console.log("isUser:", isUser)

	return (
		<main className={styles.main__wrapper}>
			<PrimaryBar />
			<SideBar activeGroup={isGroup ? "g" : "u"}  />
		</main>
	);
};

export default ConversationPage;