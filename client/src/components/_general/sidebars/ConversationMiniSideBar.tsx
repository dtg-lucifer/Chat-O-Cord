import { ConversationMiniSideBarWrapper } from "../../_styled/ConversationPage";
import styles from "../../../styles/ConversationPage/ConversationPage.module.scss";
import profPic from "../../../assets/my_pic.jpg";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const ConversationMiniSideBar = () => {
    return (
        <ConversationMiniSideBarWrapper className={styles.main__wrapper}>
            <div className={styles.top}>
                <img src={profPic} alt="prof_picture" />
            </div>
            <div className={styles.middle}>
                <NavLink to={"?panel=conversation"}><FiMessageSquare /></NavLink>
                <NavLink to={"?panel=friends"}><FaRegUser /></NavLink>
            </div>
            <div className={styles.bottom}>
                <NavLink to={"/auth/logout"}><BiLogOutCircle /></NavLink>
            </div>
        </ConversationMiniSideBarWrapper>
    );
};

export default ConversationMiniSideBar;
