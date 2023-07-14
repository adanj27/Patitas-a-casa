// Css
import styles from './styles.module.css';

// Imagenes
import PerroJugando from "/icons/perro-jugando.png"

export const Nosotros = () => {
  return (
    <div className={styles.nosotros__container}>
      <div className={styles.nosotros__headings}>
        <h2 className={styles.nosotros__title}>Sobre Nosotros</h2>
        <p className={styles.nosotros__subtitle}>
          Somos un equipo de personas unidos por el amor a los animales y que sufrimos situaciones por las que vos quizás estas pasando ahora
        </p>
      </div>
      <div className={styles["nosotros-info__container"]}>

        <div className={`${styles.nosotros__item} ${styles["nosotros__item--large"]}`}>
          <h3 className={styles["nosotros__item-title"]}>¡Conócenos!</h3>
          <p className={styles["nosotros__item-text"]}>
            Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes
          </p>
        </div>

        <div className={styles.nosotros__items}>
          <div className={styles.nosotros__item}>
            <h3 className={styles["nosotros__item-title"]}>Lo que intentamos con esto:</h3>
            <p className={styles["nosotros__item-text"]}>
              Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes
            </p>
          </div>
          <div className={styles.nosotros__item}>
            <h3 className={styles["nosotros__item-title"]}>Como lo hicimos</h3>
            <p className={styles["nosotros__item-text"]}>
              Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes
            </p>
          </div>
        </div>
      </div>
      
        <div className={styles["nosotros__why-container"]}>
          <div className={styles.nosotros__why}>
            <img className={styles["nosotros__why-img"]} src={PerroJugando} alt="imagen perro jugando con su amo" />
            <div className={styles["nosotros__why-text"]}>
              <div className={styles.nosotros__item}>
                <h3 className={styles["nosotros__item-title"]}>Porque lo hicimos:</h3>
                <p className={styles["nosotros__item-text"]}>
                  Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes            
                </p>
              </div>
            </div>
          </div>
        </div>

      <div className={styles["nosotros-info__container"]}>
        <h3 className={styles.nosotros__title}>¿Cómo surgió la idea?</h3>

        <div className={styles.nosotros__items}>
          <div className={styles.nosotros__item}>
            <h3 className={styles["nosotros__item-title"]}>Inicio</h3>
            <p className={styles["nosotros__item-text"]}>
              Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes
            </p>
          </div>
          <div className={styles.nosotros__item}>
            <h3 className={styles["nosotros__item-title"]}>Planear</h3>
            <p className={styles["nosotros__item-text"]}>
              Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes
            </p>
          </div>
          <div className={styles.nosotros__item}>
            <h3 className={styles["nosotros__item-title"]}>Empezar el proyecto</h3>
            <p className={styles["nosotros__item-text"]}>
              Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes
            </p>
          </div>
        </div>

        <div className={`${styles.nosotros__item} ${styles["nosotros__item--large"]} ${styles["text-left"]}`}>
          <h3 className={styles["nosotros__item-title"]}>Lo que es hoy en día</h3>
          <p className={`${styles["nosotros__item-text"]}`}>
            Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes
          </p>
        </div>

        <div className={`${styles.nosotros__item} ${styles["nosotros__item--large"]} ${styles["text-left"]}`}>
          <h3 className={styles["nosotros__item-title"]}>A lo que apuntamos</h3>
          <p className={styles["nosotros__item-text"]}>
            Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes Conoce nuestra historia y todo lo que tuvimos que hacer para que este servicio llegue a ustedes
          </p>
        </div>
      </div>
    </div>
  )
}