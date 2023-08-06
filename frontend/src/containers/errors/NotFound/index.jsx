import { Link } from "react-router-dom";

// Estilos
import styles from "./styles.module.css";

// Imagenes
import ImgPerroRojo from "/icons/imagenes recursos/perro-rojo.png"
import LogoPatitas from "/icons/logo-patitas-blanco.png"

const NotFound = () => {
  return (
    <div className={styles.error__container}>
      <div className={styles["error__img-container"]}>
        <img className={styles.error__img} src={ImgPerroRojo} alt="perro rojo" />
      </div>
      <div className={styles.error__headings}>
        <h2 className={styles.error__title}>404</h2>
        <h3 className={styles.error__subtitle}>Error</h3>
        <p className={styles.error__text}>Página no encontrada</p>
        <Link to="/">
          <p className={styles.error__link}>Volver a la página principal</p>
        </Link>
      </div>
    </div>
  )
}

export default NotFound

