import styles from "./index.module.scss"
import { SideBar } from "../../components/conversation";
import PrimaryBar from "../../components/primarybar";

const ConversationPage = () => {
	return (
		<main className={styles.main__wrapper}>
			<PrimaryBar />
			<SideBar />
		</main>
	);
};

export default ConversationPage;