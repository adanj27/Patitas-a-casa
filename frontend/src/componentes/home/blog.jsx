/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

import styles from '../../css/home/blog.module.css'

const blog = ({ title, content, img }) => {

  return(
    <article className={`${styles.blog} blog`}>
      <img src={"#"} alt="blog image" />
      <h2>{title}</h2>
      <p>{content}</p>
      <a>Leer mas +</a>
    </article>
    
  )
}

export default blog