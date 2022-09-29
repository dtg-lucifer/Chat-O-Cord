import React from "react";
import styles from "../styles/ProfileCard/profilecard.module.css"

const Profilecard = () => {
  return (
    <>
      <div className={styles.mainCard}>
        <div className={styles.mainSection}>
          <div id="userIcon"></div>
          <div className={styles.btns}>
            <div className={styles.btn} id="call"></div>
            <div className={styles.btn} id="msg"></div>
            <div className={styles.btn} id="group"></div>
          </div>
        </div>
        <span>Srijib_Dev</span>
        <div className={styles.aboutSection}>
          <h2>About Me</h2>
          <div id="userAbout">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi,
            nam ipsum hic numquam s
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilecard;
