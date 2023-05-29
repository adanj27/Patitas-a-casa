import styles from './styles.module.css'

export const AdopcionesTarjetaContainer = ({ imagen, nombre, descripcion }) => {
  return (
    <article className={styles.tarjeta}>
      <img src={imagen} alt="Mascota en adopción" />
      <h3 className={styles.text}>{nombre}</h3>
      {/* <p className={styles.text}>{descripcion}</p> */}
      {/* <div>
        <BtnPrincipal texto="Leer más"/>
      </div> */}
    </article>
  )
}

