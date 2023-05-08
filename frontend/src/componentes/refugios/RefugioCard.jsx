import React from 'react'

import styles from '../../css/refugios/refugiosCard.module.css'

const RefugioCard = ({title, image, clase}) => {

  const setClass = (clase) => {
    let customStyle = {}
    switch(clase) {
      case "square": 
        customStyle = { gridRow: "span 5", gridColumn: "span 5"}
        break;
      case "small":
        customStyle = { gridRow: "span 2", gridColumn: "span 3"}
        break;
      case "large":
        customStyle = { gridRow: "span 3", gridColumn: "span 6"}
        break;
      default: customStyle = { gridRow: 1, gridColumn: 1}
    }

    return customStyle
  }

  return (
    <article className={styles.refugiosCard} style={setClass(clase)} >
      <button>Lorem</button>
      <img src={image} alt={title} />
    </article>
  )
}

export default RefugioCard