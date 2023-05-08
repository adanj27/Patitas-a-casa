import React from 'react'
import styles from '../../css/home/sobreNosotros.module.css'

const SobreNosotros = ({ titulo, texto, img }) => {
  return(
    <div className={styles["sobre-nosotros"]}>
      <img src={img} alt="img-foto" className={styles["sobre-nosotros__img"]} />
      <div>
        <h2 className={styles["sobre-nosotros__titulo"]}>{titulo}</h2>
        <p className={styles["sobre-nosotros__parrafo"]}>{texto}</p>
      </div>
    </div>
  )
}

export default SobreNosotros;