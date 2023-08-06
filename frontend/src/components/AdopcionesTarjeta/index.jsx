import React from 'react';

import styles from './styles.module.css'
import { BtnPrincipal } from '../BtnPrincipal/index';

export const AdopcionesTarjeta = ({ imagen, nombre, descripcion }) => {
  return (
    <article className={styles.tarjeta}>
      <img src={imagen} alt="Mascota en adopción" loading="lazy" />
      <h3 className={styles.text}>{nombre}</h3>
      {/* <p className={styles.text}>{descripcion}</p> */}
      {/* <div>
        <BtnPrincipal texto="Leer más"/>
      </div> */}
    </article>
  )
}
