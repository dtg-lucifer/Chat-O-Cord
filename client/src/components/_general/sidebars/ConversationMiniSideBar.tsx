import { ConversationMiniSideBarWrapper } from "../../_styled/ConversationPage";
import styles from "../../../styles/ConversationPage/ConversationPage.module.scss";
import profPic from "../../../assets/my_pic.jpg";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const ConversationMiniSideBar = () => {
    return (
        <ConversationMiniSideBarWrapper className={styles.main__wrapper}>
            <div className={styles.top}>
                <img src={profPic} alt="prof_picture" />
            </div>
            <div className={styles.middle}>
                <FiMessageSquare />
                <FaRegUser />
            </div>
            <div className={styles.bottom}>
                <BiLogOutCircle />
            </div>
        </ConversationMiniSideBarWrapper>
    );
};

export default ConversationMiniSideBar;
