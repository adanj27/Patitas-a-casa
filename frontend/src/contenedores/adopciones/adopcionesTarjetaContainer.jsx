import React, { useState } from 'react';

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
  const dataHoPet = useDataHoPet().slice(0, 6)
  
  const [activeSlide, setActiveSlide] = useState(0);

  const renderCarouselItems = () => {
    const items = [];
    for (let i = 0; i < dataHoPet.length; i += 2) {
      const pet1 = dataHoPet[i];
      const pet2 = dataHoPet[i + 1];

      const item = <CarouselItem key={i} pets={[pet1, pet2]} />;

      items.push(item);
    }
    return items;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => setActiveSlide(next)
  };

  return (
    <section className={styles.adopciones}>
      <div className={sliderStyles.carousel}>
        <Slider {...settings}>{renderCarouselItems()}</Slider>
        <div className={sliderStyles.dots}>
          {Array(Math.ceil(dataHoPet.length / 2))
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