import React from "react";
import styles from "../../../styles/SettingsBar/SettingsBar.module.scss";

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
