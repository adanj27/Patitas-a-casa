// React
import React, { useEffect, useState } from 'react';

// Componentes
import { Card } from '../../../Blog/components/Card/index';

// Estilos
import styles from './styles.module.css';
import "./styles.css"

// Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Iconos
import arrowLeft from "/icons/arrow-left-black.svg"
import arrowRight from "/icons/arrow-right-black.svg"

// Data
import { blogData } from "../../../../../data/blogs"
import {Blog} from '../Blog'
import axios from 'axios'


const PrevArrow = (props) => (
  <div className={`${styles.arrow} ${styles.prev}`} onClick={props.onClick}>
    <img className={styles["arrow-icon"]} src={arrowLeft} alt="icono flecha izquierda" />
  </div>
);

const NextArrow = (props) => (
  <div className={`${styles.arrow} ${styles.next}`} onClick={props.onClick}>
    <img className={styles["arrow-icon"]} src={arrowRight} alt="icono flecha derecha" />
  </div>
);

const CarouselItem = ({ pets }) => {
  return (
      <div className={`${styles.blogCards}`}>
        {pets.map((blog, index) => {
          return (
            <Card 
              key={index}
              id={blog.id}
              img={blog.imageBanner}
              consejo={blog.category}
              titulo={blog.title}
              descripcion={blog.description[0].content.split(" ").slice(0, 15).join(" ")}
              fecha={blog.date}
            />
          )
        })}
      </div>
  );
};

const Carousel = () => {
  const data = blogData.slice(0, 9)
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const numSlides = isDesktop ? 3 : isTablet ? 2 : 1;
  const numTotalSlides = Math.ceil(data.length / numSlides);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1400px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)');
    const listener = () => setIsTablet(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isTablet]);

  const renderCarouselItems = () => {
    const items = [];
    for (let i = 0; i < data.length; i += numSlides) { // Utilizamos numSlides aquí
      const pets = data.slice(i, i + numSlides);
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
    speed: 2000,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => setActiveSlide(next)
  };

  return (
      <div className={styles.blogContainer}>
        <div className={`${styles.blog} blog`}>
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
      </div>
  );
};

export const BlogContainer = () => {
  return (
    <Carousel />
  )
}
