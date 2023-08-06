import React, { useEffect, useState } from 'react';

// Tarjeta de cada mascota
import { AdopcionesTarjeta } from '../AdopcionesTarjeta/index';

// Estilos
import styles from './styles.module.css';
import "./adopcionesSlider.css"


// Hooks
import useGet from '../../hooks/services/useGet.js' // API GET

// Data mascotas
import useDataHoPet from '../../hooks/useDataHoPet.js';

// Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Iconos
import arrowLeft from "/icons/arrow-left.svg"
import arrowRight from "/icons/arrow-right.svg"


const PrevArrow = (props) => (
  <div className={`${styles.arrow} ${styles.prev}`} onClick={props.onClick}>
    <img className={styles["arrow-icon"]} src={arrowLeft} alt="icono flecha izquierda" loading="lazy" />
  </div>
);

const NextArrow = (props) => (
  <div className={`${styles.arrow} ${styles.next}`} onClick={props.onClick}>
    <img className={styles["arrow-icon"]} src={arrowRight} alt="icono flecha derecha" loading="lazy" />
  </div>
);

const CarouselItem = ({ pets }) => {
  return (
    <div className={styles["carousel-items"]}>
      <div className={styles["carousel-item"]}>
        {pets.map(pet => (
          <AdopcionesTarjeta
            key={pet.id} 
            imagen={pet.imagen} 
            nombre={pet.nombre} 
            descripcion={pet.descripcion} />
        ))}
      </div>
    </div>
  );
};

const Carousel = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dataHoPet = useDataHoPet().slice(0, 16) // | useGet('/dogs')
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const numSlides = isDesktop ? 8 : isTablet ? 6 : 2;
  const numTotalSlides = Math.ceil(dataHoPet.length / numSlides);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1400px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1000px)');
    const listener = () => setIsTablet(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isTablet]);

  const renderCarouselItems = () => {
    const items = [];
    for (let i = 0; i < dataHoPet.length; i += numSlides) { // Utilizamos numSlides aquí
      const pets = dataHoPet.slice(i, i + numSlides);
      const item = <CarouselItem key={i} pets={pets} />;
      items.push(item);
    }
    return items;
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => setActiveSlide(next)
  };

  return (
    <section className={styles.adopciones}>
      <div className={styles.carousel}>
        <Slider {...settings}>{renderCarouselItems()}</Slider>
        <div className={styles.dots}>
          {Array(numTotalSlides)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${activeSlide === index ? styles.active : ""}`}
                onClick={() => setActiveSlide(index)}
              ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AdopcionesTarjetaContainer = () => {
  return (
    <Carousel />
  )
}