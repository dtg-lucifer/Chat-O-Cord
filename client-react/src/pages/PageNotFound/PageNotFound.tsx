import styles from "./PageNotFound.module.scss";
import { FaGithub, FaYoutube, FaInstagram, FaDiscord } from "react-icons/fa";
import { QuickLink, SocialWrapper } from "./PageNotFound.styled";

const PageNotFound = () => {
  return (
    <div className={styles.main__wrapper}>
      <div className={styles.top__wrapper}>
        <div className={styles.top__heading}>404</div>
        <div className={styles.top__text}>
          We are sorry, but you have requested an unknown page.
        </div>
      </div>
      <div className={styles.bottom__wrapper}>
        <div className={styles.bottom__quickText}>
          We wonder if you are lost, here is some quick links with you can
          navigate
        </div>
        <div className={styles.bottom__quickLinks}>
          <QuickLink to="/">Go Home</QuickLink>
          <QuickLink to="/contact">Contact Us</QuickLink>
        </div>
      </div>
      <SocialWrapper
        color="#eca7ec"
        fDirection="column"
        gap="2rem"
        size="2.5rem"
      >
        <a
          href="https://github.com/dtg-lucifer"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          <FaYoutube />
        </a>
        <a
          href="https://www.instagram.com/p_i_u_s_h_._b_o_s_e/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://discord.gg/AUgqhYDCJy"
          target="_blank"
          rel="noreferrer"
        >
          <FaDiscord />
        </a>
      </SocialWrapper>
    </div>
  );
};

export default PageNotFound;
