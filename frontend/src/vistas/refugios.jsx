// React
import React from "react";

// Estilos
import styles from "../css/refugios/refugios.module.css"

// Componentes y contenedores
import RefugiosPetsContainer from '../contenedores/refugios/RefugiosPetsContainer'
import Footer from "../componentes/Footer/Footer";
import Lista from "../componentes/principales/Lista"
import RefugioServicio from "../componentes/refugios/RefugioServicio"
import Nav from "../componentes/nav/nav"

// Imágenes
import headerBar from '../iconos/imagenes recursos/refugios_fondo.png'
import imgFundacion from "../iconos/img-refugios/fundacion.jpg"
import imgServicio1 from "../iconos/img-refugios/actividades-divertidas.png"
import imgServicio2 from "../iconos/img-refugios/pet-house.png"
import imgServicio3 from "../iconos/img-refugios/servicio-aseo.png"
import imgServicio4 from "../iconos/img-refugios/veterinario.png"

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

const Refugios = () =>{
  return(
    <>
      <img src={headerBar} className={styles.headerImg} alt="refugio pets bar" />
      <RefugiosPetsContainer />
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
                <RefugioServicio
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

export default Refugios;