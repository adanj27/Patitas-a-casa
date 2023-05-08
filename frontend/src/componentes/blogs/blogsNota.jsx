import dogIcon from '../../iconos/canino-animado.png';
import styles from '../../css/blogs/blogsNota.module.css';

export default function BlogsNota ({ text }) {
  return (
    <div className={styles.blogsNota__container}>
      <img src={dogIcon} alt='dogIcon'/>
      <p>{text}</p>
    </div>
  )
}