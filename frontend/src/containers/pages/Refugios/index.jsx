import { Lista } from '../../../components'

import styles from './styles.module.css'

import headerBar from "/icons/imagenes recursos/refugios_fondo.png";
import imgFundacion from "/icons/img-refugios/fundacion.jpg";
import imgServicio1 from "/icons/img-refugios/actividades-divertidas.png";
import imgServicio2 from "/icons/img-refugios/pet-house.png";
import imgServicio3 from "/icons/img-refugios/servicio-aseo.png";
import imgServicio4 from "/icons/img-refugios/veterinario.png";
import iconRefugio from "/icons/icono-casa-mascota.png";

import { refugios } from '../../../refugios/refugiosData'
import { LetraTitulo, LetraParrafo } from '../../../components';
import { Refugio } from './components/Refugio'
import { Container, Servicio } from "./components";

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

const Refugios = () => {

  return (
    <>
      <section className={styles['refugios-section']}>
        <header className={styles['refugios-section__title']}>
          <div className={styles["section__title-container"]}>
            <LetraTitulo
              texto="Refugios"
              clase="letra-titulo--red"
            />
          </div>
          <div className={styles["texto-container__subtitulo"]}>
            <LetraParrafo
              texto="Estos son algunos de los refugios con los que trabajamos y apoyamos"
              clase="letra-parrafo--black"
            />
          </div>
        </header>
        <article className={styles['refugios-section__content']}>
          {refugios.map((data, id) => {
            return (
              <Refugio
              key={data.id}
              id={data.id}
              icon={data.icono}
              name={data.nombre}
              description={data.descripcion}
              location={data.ubicacion}
              donate={data.donar.links[id]}
            />
            );
          })}
        </article>
      </section>
    </>
  )
}

export default Refugios
