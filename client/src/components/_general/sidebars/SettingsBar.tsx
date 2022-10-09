import React from "react";
import styles from "../../../styles/SettingsPage/SettingsPage.module.scss";
import { FaUserAlt, FaUnlock, FaBell, FaBrush } from "react-icons/fa";
import { TbWebhook } from "react-icons/tb";

const SettingsBar = () => {
  return (
    <aside className={styles.main}>
      <header>Settings</header>
      <div className={styles.options}>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}><FaUserAlt /></div>
          <div id="profileOption">Profile</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}><FaUnlock /></div>
          <div id="securityOption">Security</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}><FaBell /></div>
          <div id="notificationOption">Notification</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}><TbWebhook /></div>
          <div id="integrationsOption">Integrations</div>
        </div>
        <div className={styles.settingsOptions}>
          <div className={styles.svg}><FaBrush /></div>
          <div id="appearanceOption">Appearance</div>
        </div>
      </div>
    </aside>
  );
};

export default SettingsBar;
