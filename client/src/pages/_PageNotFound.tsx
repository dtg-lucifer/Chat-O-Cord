import React from 'react'
import SocialIcons from '../components/_general/social/SocialIcons'
import { QuickLink } from '../components/_styled/PageNotFound'
import styles from "../styles/PageNotFound/NotFound.module.scss"

const PageNotFound = () => {
  return (
    <div className={styles.main__wrapper}>
        <div className={styles.top__wrapper}>
            <div className={styles.top__heading}>404</div>
            <div className={styles.top__text}>We are sorry, but you have requested an unknown page.</div>
        </div>
        <div className={styles.bottom__wrapper}>
            <div className={styles.bottom__quickText}>We wonder if you are lost, here is some quick links with you can navigate</div>
            <div className={styles.bottom__quickLinks}>
                <QuickLink to="/">Go Home</QuickLink>
                <QuickLink to="/contact">Contact Us</QuickLink>
            </div>
        </div>
        <SocialIcons />
    </div>
  )
}

export default PageNotFound