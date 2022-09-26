import React from 'react'
import LogInForm from '../../components/_general/forms/LogInForm'
import styles from "../../styles/AuthenticationPage/SignInPage.module.scss"

const LogInPage = () => {
  return (
    <div className={styles.main__wrapper}>
        <LogInForm />
    </div>
  )
}

export default LogInPage