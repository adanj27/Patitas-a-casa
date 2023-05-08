import styles from '../../css/blogs/blogsSubtitulos.module.css';

export default function BlogsSubtitulos ({ text }) {
  return <h3 className={styles.blogsSubtitulos}>{text}</h3>;
}