/* eslint-disable jsx-a11y/img-redundant-alt */
import styles from './styles.module.css';

export const Blog = ({ title, content, img }) => {
  return (
    <article className={`${styles.blog} blog`}>
      <img src={"#"} alt="blog image" />
      <h2>{title}</h2>
      <p>{content}</p>
      <a>Leer mas +</a>
    </article>
  )
}
