/* eslint-disable default-case */
import React, { useEffect, useState } from 'react'

import {Blog} from '../Blog'

import axios from 'axios'

import styles from './styles.module.css'

export const BlogContainer = () => {

  const [data, setData] = useState([{}])
  useEffect(() => {
    const fetchResponse = async() => {
      const response = await axios.get('/blog/')
      setData(response.data);
    };

    fetchResponse()
  },[])

  return (
    <section className={styles.blogMegaContainer}>
      <section className={`${styles.blogContainer} blogContainer`}>
      {data.map((object, i) => {
        return (<Blog key={i} title={object.title} content={object.content} img={'#'}/>)
      })}
      </section>
    </section>
  )
  

}
