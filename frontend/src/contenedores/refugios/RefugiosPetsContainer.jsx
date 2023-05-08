/* eslint-disable default-case */
import React, { useEffect, useState } from 'react'

import RefugioCard from '../../componentes/refugios/RefugioCard'

import styles from '../../css/refugios/refugiosPetsContainer.module.css'

// assets import
import borderDog from '../../iconos/imagenes recursos/220805-border-collie-play-mn-1100-82d2f1.jpg'
import tinyCat from '../../iconos/imagenes recursos/descarga (1).jpg'
import pug from '../../iconos/imagenes recursos/pug-1-0d4c0f988e3d421ca4954917b1450664.jpg'
import catCow from '../../iconos/imagenes recursos/catImage2.jpg'

const RefugiosPetsContainer = () => {

  const [pets, setPets] = useState([])

  useEffect(() => {
    const initialPets = [
      {
        title: 'perro',
        image: borderDog
      },
      {
        title: 'gato2',
        image: tinyCat
      },
      {
        title: 'perro2',
        image: pug
      },
      {
        title: 'gato',
        image: catCow
      },
      
    ]

    setPets(initialPets)
  },[])

  const setClass = (i) => {
    let cardClass = ""
    switch(i) {
      case 0: 
        cardClass = "square"
        break;
      
      case 1:
        cardClass = "small"
        break;
      
      case 2:
        cardClass = "small"
        break;
      
      case 3:
        cardClass = "large"
        break;
    }

    return cardClass
  }
  const cards = pets.map((object, i) => (<RefugioCard key={i} title={object.title} image={object.image} clase={setClass(i)}/>))

  return (
    <section className={styles.petsContainer}>
      {cards}
    </section>
  )
}

export default RefugiosPetsContainer