import React from 'react'
import { LogoWhite } from "../../iconos/svg/icons_svg";
import styles from "../../css/home/loading.module.css"

const Loading = () => {
  return (
    <>
      <div className={styles.loading__container}>
        <LogoWhite className={styles.loading__img} />
      </div>
    </>
  )
}

export default Loading