import React from 'react';
import styles from "../../css/principales/lista.module.css"
import imgPaw from "../../iconos/img-refugios/pawRed.png"

const Lista = ({ texto }) => {
  return (
    <div className={styles.lista}>
      <img className={styles.lista__img} src={imgPaw} alt="Pata" />
      <p className={styles.lista__parrafo}>{texto}</p>
    </div>
  );
}

export default Lista;