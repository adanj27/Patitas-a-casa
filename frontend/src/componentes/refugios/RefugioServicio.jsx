import React from "react";
import styles from "../../css/refugios/refugioServicio.module.css"

const RefugioServicio = ({ src, texto }) => {
  return(
    <article className={styles.servicio}>
      <img src={src} alt="Servicio" />
      <p>{texto}</p>
    </article>
  )
}

export default RefugioServicio;