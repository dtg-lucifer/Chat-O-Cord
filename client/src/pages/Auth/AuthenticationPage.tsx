import React from 'react'
import RegisterForm from '../../components/_general/forms/RegisterForm'
import styles from "../../styles/AuthenticationPage/index.module.scss"

const AuthenticationPage = () => {
  return (
    <div className={styles.wrapper}>
        <RegisterForm />
    </div>
  )
}

export default AuthenticationPage