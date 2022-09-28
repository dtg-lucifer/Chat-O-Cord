import React from "react";
import styles from "../styles/ProfileCard/ProfileCard.module.css";

const ProfileCard = () => {
  return (
    <>
      <div className="main-card">
        <div className="main-section">
          <div id="user-icon"></div>
          <div className="btns">
            <div className="btn" id="call"></div>
            <div className="btn" id="msg"></div>
            <div className="btn" id="group"></div>
          </div>
        </div>
        <span>Srijib_Dev</span>
        <div className="about-section">
          <h2>About Me</h2>
          <div id="user-about">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi,
            nam ipsum hic numquam s
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
