import { Lista } from '../../../components'

import styles from './styles.module.css'

import headerBar from '/icons/imagenes recursos/refugios_fondo.png'
import imgFundacion from "/icons/img-refugios/fundacion.jpg"
import imgServicio1 from "/icons/img-refugios/actividades-divertidas.png"
import imgServicio2 from "/icons/img-refugios/pet-house.png"
import imgServicio3 from "/icons/img-refugios/servicio-aseo.png"
import imgServicio4 from "/icons/img-refugios/veterinario.png"
import { Container, Servicio } from "./components"

const listaServicios = [
  "Lorem ipsum dolor sit",
  "Amet consectetur adipisicing elit.",
  "Repellendus architecto, explicabo"
]

const servicios = [
  { img: imgServicio1, texto: "Actividades divertidas" },
  { img: imgServicio2, texto: "Hotel para mascotas" },
  { img: imgServicio3, texto: "Servicios de aseo" },
  { img: imgServicio4, texto: "Veterinario 24/7" }
]

export const Refugios = () =>{
  return(
    <>
      <img src={headerBar} className={styles.headerImg} alt="refugio pets bar" />
      <Container />
      <main className={styles.main}>
        <section className={styles.servicios}>
          <h2 className={styles.servicios__titulo}>Nuestros Servicios</h2>
          <article className={styles.servicios__container}>
            <section className={styles.servicios__section}>
              <h3 className={styles.servicios__subtitulo}>Lo mejor para tu mascota</h3>
              <p className={styles.servicios__parrafo}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Optio molestiae sint quod ipsum aliquam nesciunt.
                Repellendus architecto, explicabo, molestiae iste nobis repellat
                sunt voluptates sapiente voluptas cupiditate cum placeat nostrum.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Optio molestiae sint quod ipsum aliquam nesciunt.
                Repellendus architecto, explicabo, molestiae iste nobis repellat
                sunt voluptates sapiente voluptas cupiditate cum placeat nostrum.
              </p>
              <h3 className={styles.servicios__subtitulo}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
              {
                listaServicios.map((listaTexto, indice) => 
                  <Lista texto={listaTexto} key={indice} />
                )
              }
            </section>
            <figure className={styles.servicios__img}>
              <img src={imgFundacion} alt="Fundación" />
            </figure>
          </article>
        </section>
        <section className={`${styles.servicios__container} ${styles["servicios__container--separacion"]}`}>
          {
            servicios.map(({ img, texto }, indice)=>{
              return(
                <Servicio
                  src={img}
                  texto={texto}
                  key={indice}
                />
              );
            })
          }
        </section>
      </main>
    </>
  )
}

