// Css
import styles from './styles.module.css';

import { devsData } from "../../../data/dev-data";

// Imagenes
import PerroJugando from "/icons/perro-jugando.png"
import Popup from "./components/Popup";
import { useState } from "react";
import ImageWithPopup from "./components/ImageWithPopup";

const Nosotros = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className={styles.nosotros__container}>
      <div className={styles.nosotros__headings}>
        <h2 className={styles.nosotros__title}>Sobre Nosotros</h2>
        <p className={styles.nosotros__subtitle}>
          Somos un equipo que nos une el amor por los animales y que sufrimos situaciones por las que vos quizás estas pasando ahora mismo.
        </p>
      </div>
      <div className={styles["nosotros-info__container"]}>

        <div className={`${styles.nosotros__item} ${styles["nosotros__item--large"]}`}>
          <h3 className={styles["nosotros__item-title"]}>¡Conócenos!</h3>
          <div className={styles.nosotros__devs}>
            {devsData.map((dev, index) => {
              return (
                <ImageWithPopup key={index} dev={dev} />
              )
            })}
          </div>
          <p className={styles["nosotros__item-text"]}>
            Somos el equipo de Patitas a Casas un grupo de desarrolladores que nos encargamos de diseñar y idear toda esta herramienta.
            <br />
            Nuestro equipo se renueva constantemente con nuevas personas y habilidades distintas, si quieres formar parte de nosotros ponte en contacto con nosotros a través de un correo electrónico y tendremos una charla para que trabajemos juntos.
          </p>
        </div>

        <div className={styles.nosotros__items}>
          <div className={styles.nosotros__item}>
            <h3 className={styles["nosotros__item-title"]}>Lo que intentamos con esto:</h3>
            <p className={styles["nosotros__item-text"]}>
              Lo que intentamos con este proyecto es ayudar a todas esas personas que perdieron a una mascota, de forma totalmente gratuita. También apuntamos a sumar nuevos integrantes a las familias con nuestro a apartado exclusivo para animalitos en adopción 
            </p>
          </div>
          <div className={styles.nosotros__item}>
            <h3 className={styles["nosotros__item-title"]}>Como lo hicimos</h3>
            <p className={styles["nosotros__item-text"]}>
              Todo empezó siendo diseñado por una persona, posteriormente se publico un comentario en un canal de desarrolladores y desde ahí el equipo se expandió. Todos estos son desarrolladores y diseñadores jóvenes apasionados por su trabajo y se unieron a este proyecto para ampliar sus conocimientos y experiencia laboral. 
            </p>
          </div>
        </div>
      </div>
      
        <div className={styles["nosotros__why-container"]}>
          <div className={styles.nosotros__why}>
            <img className={styles["nosotros__why-img"]} src={PerroJugando} alt="imagen perro jugando con su amo" />
            <div className={styles["nosotros__why-text"]}>
              <div className={styles.nosotros__item}>
                <h3 className={styles["nosotros__item-title"]}>Porque lo hicimos:</h3>
                <p className={styles["nosotros__item-text"]}>
                  Para contribuir al bienestar de las mascotas que carecen de un hogar es una acción admirable y significativa. Al brindarles ayuda y la posibilidad de regresar a sus familias, se promueve un ambiente de amor y cuidado para estos seres queridos de cuatro patas. Además, esta noble causa no solo impacta positivamente en la vida de las mascotas, sino también en la comunidad en general, creando conciencia sobre la importancia de la adopción responsable y el cuidado responsable de los animales domésticos.        
                </p>
              </div>
            </div>
          </div>
        </div>

      <div className={styles["nosotros-info__container"]}>
        <h3 className={styles.nosotros__title}>¿Cómo surgió la idea?</h3>

        <div className={styles.nosotros__items}>
          <div className={`${styles.nosotros__item} ${styles["nosotros__item--card"]}`}>
            <h3 className={styles["nosotros__item-title"]}>Inicio</h3>
            <p className={styles["nosotros__item-text"]}>
             Todo inicio con una idea, se le fue comentando a distintas personas para ir mejorándola, y una vez que nos dimos cuenta que era una buena idea y tenia un futuro, empezamos con la planeación.
            </p>
          </div>
          <div className={`${styles.nosotros__item} ${styles["nosotros__item--card"]}`}>
            <h3 className={styles["nosotros__item-title"]}>Planear</h3>
            <p className={styles["nosotros__item-text"]}>
              Se le dio forma a la idea para ir compartiéndola por diferentes canales de comunicación para poder buscar gente que quiera colaborar con el proyecto, una vez que se empezó a diseñar la paginas y las funcionalidades, se empezó la fase de desarrollo. 
            </p>
          </div>
          <div className={`${styles.nosotros__item} ${styles["nosotros__item--card"]}`}>
            <h3 className={styles["nosotros__item-title"]}>Desarrollo</h3>
            <p className={styles["nosotros__item-text"]}>
              En enero del 2022 se empezó el desarrollo y constante mejora de “Patitas a Casa” en cada paso de la construcción de los módulos del sitio web y cada una de sus funcionalidades para que sea lo mejor y mas útil para los usuarios.
            </p>
          </div>
          <div className={`${styles.nosotros__item} ${styles["nosotros__item--card"]}`}>
            <h3 className={styles["nosotros__item-title"]}>Hoy</h3>
            <p className={styles["nosotros__item-text"]}>
              Al día de hoy esta herramienta sigue en desarrollo y con un equipo que aprende todo los días de este proyectos para ponerle solución a todos los inconvenientes que se nos pongan en el camino para que esta herramienta siga con su propósito y ayude a toda la gente posible.
            </p>
          </div>
        </div>

        <div className={`${styles.nosotros__item} ${styles["nosotros__item--large"]} ${styles["text-left"]}`}>
          <h3 className={styles["nosotros__item-title"]}>Lo que es hoy en día</h3>
          <p className={`${styles["nosotros__item-text"]}`}>
            Hoy “Patitas a Casa” es una herramienta por y para personas que perdieron a una mascota alguna vez en su vida, todo esto de forma totalmente gratuita, y esta herramienta funciona gracias a todos los que la usen tanto para reportar una perdida o alguna mascota que parece estar perdida, como principal método de difusión de las tarjetas de reportes usamos las redes sociales, por eso es muy importante que esta herramienta la usemos todos correctamente y si tienes alguna duda consulta al soporte técnico o por medio de nuestras redes sociales.
          </p>
        </div>
        
        <div className={`${styles.nosotros__item} ${styles["nosotros__item--large"]} ${styles["text-left"]}`}>
          <h3 className={styles["nosotros__item-title"]}>A lo que apuntamos</h3>
          <p className={styles["nosotros__item-text"]}>
            El objetivo principal de esta herramienta es garantizar que se vuelva cada vez más útil para todos los usuarios, logrando aumentar significativamente la cantidad de mascotas encontradas y fomentando su uso de manera constante. Además, se prevé incorporar una amplia gama de nuevas funcionalidades que contribuyan a potenciar su eficacia y comodidad en el proceso de búsqueda y localización de nuestras queridas mascotas perdidas o extraviadas.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Nosotros