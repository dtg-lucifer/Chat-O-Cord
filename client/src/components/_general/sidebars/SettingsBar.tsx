import React from "react";
<<<<<<< HEAD
import styles from "../../../styles/SettingsBar/SettingsBar.module.scss";
=======
import styles from "../../../styles/SettingsPage/SettingsPage.module.scss";
>>>>>>> 95aa4c163827a269990dd97ed3a5e1edf447f5e9

const SettingsBar = () => {
  return (
    <div className={styles.main}>
      <h2>Settings</h2>
      <div className={styles.options}>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}></div>
          <div id="profileOption">Profile</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}></div>
          <div id="securityOption">Security</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}></div>
          <div id="notificationOption">Notification</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}></div>
          <div id="integrationsOption">Integrations</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}></div>
          <div id="appearanceOption">Appearance</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsBar;
