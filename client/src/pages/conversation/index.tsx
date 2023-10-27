import styles from "./index.module.scss"
import { SideBar } from "../../components/conversation";

const ConversationPage = () => {
	return (
		<main className={styles.main__wrapper}>
			<SideBar />
		</main>
	);
};

export default ConversationPage;