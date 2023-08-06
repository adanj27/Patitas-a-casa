import React from 'react'

// Css
import styles from "./styles.module.css"

// Imágenes
import RescuedIcon from "/icons/icono-rescatados.png"
import LogoPatita from "/icons/icono-adoptados.png"
import HousePetIcon from "/icons/icono-casa-mascota.png"

export const Stats = () => {
  return (
    <>
      <div className={styles.stats__container}>
        <div className={styles.stats__stat}>
          <img className={styles.stats__icon} src={RescuedIcon} alt="icono rescatados" loading="lazy" />
          <span>
            <p>Animales reencontrados</p>
          </span>
          <p className={styles.stats__number}>+0</p>
        </div>
        <div className={styles.stats__stat}>
          <img className={styles.stats__icon} src={LogoPatita} alt="icono adoptados" loading="lazy" />
          <span>
            <p>Adoptados</p>
          </span>
          <p className={styles.stats__number}>+0</p>
        </div>
        <div className={styles.stats__stat}>
          <img className={styles.stats__icon} src={HousePetIcon} alt="icono casa mascota" loading="lazy" />
          <span>
            <p>Refugios con los que trabajamos</p>
          </span>
          <p className={styles.stats__number}>+0</p>
        </div>
      </div>
    </>
  )
}