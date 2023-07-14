import React from 'react'
import LogoWhite from "/icons/logo-patitas-blanco.png";
import styles from "./styles.module.css"

const Loading = () => {
  return (
    <>
      <div className={styles.loading__container}>
        <img src={LogoWhite} className={styles.loading__img} alt="logo patitas blanco" />
      </div>
    </>
  )
}

export default Loading