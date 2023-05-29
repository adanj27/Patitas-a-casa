import React from 'react'
import LogoWhite from "../../iconos/logo-patitas-blanco.png";
import styles from "../../css/home/loading.module.css"

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