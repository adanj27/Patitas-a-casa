import styles from "./styles.module.css"
import imgPaw from "/icons/img-refugios/pawRed.png"

export const Lista = ({ texto }) => {
  return (
    <div className={styles.lista}>
      <img className={styles.lista__img} src={imgPaw} alt="Pata" />
      <p className={styles.lista__parrafo}>{texto}</p>
    </div>
  );
}

