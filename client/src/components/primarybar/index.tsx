import { useContext } from "react";
import styles from "./index.module.scss";
import { BiMessageSquareDetail, BiLogOutCircle } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import AuthContext from "../../utils/context/authContext";

export default function PrimaryBar() {
  const { user } = useContext(AuthContext);
  return (
    <aside className={styles.wrapper}>
      <div className={styles.image__wrapper}>
        <img alt="profile_pic" src={user?.profilePic || "/BLANK.jpeg"} />
      </div>
      <div className={styles.option__wrapper}>
        <span
          className={`${styles.option__wrapper} relative`}
          data-tooltip="Conversations"
        >
          <BiMessageSquareDetail
            cursor="pointer"
            color={
              window.location.href.split("/").includes("conversations")
                ? "#00ff38"
                : ""
            }
          />
        </span>
        <span
          className={`${styles.option__wrapper} relative`}
          data-tooltip="Friends"
        >
          <BsFillPersonFill
            cursor="pointer"
            color={
              window.location.href.split("/").includes("friends")
                ? "#00ff38"
                : ""
            }
          />
        </span>
      </div>
      <div className={styles.logout__container}>
        <span className={`${styles.logout_wrapper} relative`} data-tooltip="Logout">
          <BiLogOutCircle cursor="pointer" />
        </span>
      </div>
    </aside>
  );
}
