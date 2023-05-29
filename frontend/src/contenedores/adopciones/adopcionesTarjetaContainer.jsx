import React, { useEffect, useState } from 'react';

// Tarjeta de cada mascota
import AdopcionesTarjeta from '../../componentes/adopciones/adopcionesTarjeta';

// Estilos
import styles from '../../css/adopciones/adopcionesTarjetaContainer.module.css';
import sliderStyles from "../../css/adopciones/adopcionesSlider.module.css";
import "../../css/adopciones/adopcionesSlider.css"

// Data mascotas
import useDataHoPet from '../../hooks/useDataHoPet.js';

// Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Iconos
import arrowLeft from "../../iconos/arrow-left.svg"
import arrowRight from "../../iconos/arrow-right.svg"


const PrevArrow = (props) => (
  <div className={`${sliderStyles.arrow} ${sliderStyles.prev}`} onClick={props.onClick}>
    <img className={sliderStyles["arrow-icon"]} src={arrowLeft} alt="icono flecha izquierda" />
  </div>
);

const NextArrow = (props) => (
  <div className={`${sliderStyles.arrow} ${sliderStyles.next}`} onClick={props.onClick}>
    <img className={sliderStyles["arrow-icon"]} src={arrowRight} alt="icono flecha derecha" />
  </div>
);

const CarouselItem = ({ pets }) => {
  return (
    <div className={sliderStyles["carousel-items"]}>
      <div className={sliderStyles["carousel-item"]}>
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
  const dataHoPet = useDataHoPet().slice(0, 20)
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
      <div className={sliderStyles.carousel}>
        <Slider {...settings}>{renderCarouselItems()}</Slider>
        <div className={sliderStyles.dots}>
          {Array(numTotalSlides)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className={`${sliderStyles.dot} ${activeSlide === index ? sliderStyles.active : ""}`}
                onClick={() => setActiveSlide(index)}
              ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

const adopcionesTarjetaContainer = () => {
  return (
    <Carousel />
  )
}

export default adopcionesTarjetaContainer