import styles from './styles.module.css'

export const Servicio = ({ src, texto }) => {
  return(
    <article className={styles.servicio}>
      <img src={src} alt="Servicio" />
      <p>{texto}</p>
    </article>
  )
}

