import dogIcon from '/icons/canino-animado.png';
import styles from './styles.module.css';

export const Nota = ({ text }) => {
  return (
    <div className={styles.blogsNota__container}>
      <img src={dogIcon} alt='dogIcon'/>
      <p>{text}</p>
    </div>
  )
}
