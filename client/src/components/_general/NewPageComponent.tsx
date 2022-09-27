import React from 'react'
import styles from "../../styles/SideBar/SideBar.module.scss"
import SideBar from './sidebar/SideBar'

const NewPageComponent = () => {
  return (
    <>
      <div className={styles.main__wraper}>NewPageComponent</div>
      <SideBar />
    </>
  );
}

export default NewPageComponent