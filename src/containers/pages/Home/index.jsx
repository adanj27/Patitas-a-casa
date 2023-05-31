// React
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

import TarjetaDestacadaContainer from './components/TarjetaDestacadaContainer';
import {BlogContainer} from './components/BlogContainer';

import { Link } from "react-router-dom";

import { AdopcionesTarjetaContainer, BtnPrincipal, Formulario, LetraTitulo, Lista } from '../../../components';
import { LogoWhite } from '../../../components/Icons';

// React Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliderHeader.css"

// Imágenes
import headerImg1 from '../../../../public/icons/imagenes recursos/header-img-1.jpg';
import headerImg2 from '../../../../public/icons/imagenes recursos/header-img-2.jpg';
import headerImg3 from '../../../../public/icons/imagenes recursos/header-img-3.jpg';

// Iconos
import arrowLeft from "../../../../public/icons/arrow-left.svg"
import arrowRight from "../../../../public/icons/arrow-right.svg"

import sliderStyles from "../../../components/AdopcionesTarjetaContainer/styles.module.css";
import Loading from "../../../components/Loading/index";

const listaHistoria = [
	`Esta idea surgió de un punto de vista de querer ayudar a esas personas que quieren
  encontrar a sus amigos peludos extraviados, dando una mano desde la virtualidad
  para que puedan reencontrarse.`,
	`El equipo de trabajo se formo desde 0 buscando a gente interesada en trabajar
  en un proyecto relacionado con el rastro de mascotas con gente de diferentes
  provincias y paises.`,
	`Desafíos que se han presentado durante el desarrollo de la página y como se han solucionado.`,
];

const listaMision = [
	'Cuál es el propósito de la página y que impacto se espera tener en la comunidad.',
	'Cuáles son los valores y principios que guían el trabajo del equipo.',
	'Cómo se espera que los usuarios utilicen la página y que beneficios pueden obtener de ella.',
];


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

export const Home = () => {
	const [modal, setModal] = useState(false);
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2500);
	}, []);
	
	useEffect(() => {
		const handleScroll = () => {
			if (isLoading) {
				// Desactivar scroll hacia abajo mientras se carga
				if (window.scrollY > 0) {
					window.scrollTo(0, 0);
				}
			}
		};
	
		if (isLoading) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	
		window.addEventListener('scroll', handleScroll);
	
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isLoading]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: false,
		dotsClass: "button__bar"
	};

	return (
		<>
			{isLoading && 
				<Loading />
			}
			<header className={styles.header}>
				<Slider {...settings}>
					<img className={styles["header__slider--img"]} src={headerImg1} alt="" />
					<img className={styles["header__slider--img"]} src={headerImg2} alt="" />
					<img className={styles["header__slider--img"]} src={headerImg3} alt="" />
				</Slider>
				<section className={styles.header__section}>
					<LogoWhite className={styles.header__logo} />
					<p className={styles.header__title}>"Rescatando patitas, salvando corazones"</p>
					<div className={styles.header__buttons}>
						<BtnPrincipal texto="Reportar" setModal={setModal} />
						<Link to="/adoptar">
							<BtnPrincipal texto="Adoptar" />
						</Link>
					</div>
				</section>
			</header>

			<section className={styles['publicacion-destacada']}>
				<LetraTitulo
					texto="PUBLICACION RECIENTES"
					clase={'letra-titulo--red'}
				/>
				<h3 className={styles["publicacion-destaca__sub-titulo"]}>
					Cuando reporta una mascota perdida/encontrada, su publicación
					aparecerá aquí como publicación reciente.
				</h3>
					<TarjetaDestacadaContainer />
					<div className={styles['publicacion-destacada__buttons']}>
						<BtnPrincipal texto="Encontrados" />
						<BtnPrincipal texto="Perdidos" />
					</div>
				</section>
				<div className={styles.adopciones}>
					<LetraTitulo
						texto="ADOPCIONES"
						clase="letra-titulo--red"
						align="center"
					/>
					<AdopcionesTarjetaContainer />
					<Link to="/adoptar" className={styles.header__buttons}>
						<BtnPrincipal texto="Adoptar" />
					</Link>
				</div>
				<LetraTitulo texto="BLOG" clase="letra-titulo--red" align="center" />
				<BlogContainer />
				<section className={styles['sobre-nosotros']}>
					<LetraTitulo texto="Sobre Nosotros" clase="letra-titulo--red" />
					<article className={styles['sobre-nosotros__container']}>
						<section className={styles['sobre-nosotros__section']}>
							<h2>Historia</h2>
							{listaHistoria.map((lista, id) => {
								return <Lista texto={lista} key={id} />;
							})}
							<p>
								Nuestra página web surgió de la idea de unir a personas que han
								perdido a sus mascotas con aquellos que han encontrado a animales
								en la calle. Al ser amantes de los animales, sabemos lo doloroso
								que es perder a un amigo peludo y lo gratificante que es poder
								ayudar a reunir a una mascota con su familia. Por eso, nos
								propusimos crear esta plataforma para facilitar la búsqueda de
								mascotas perdidas y ayudar a que puedan regresar a sus hogares.
							</p>
							<p>
								A lo largo del desarrollo de la página, hemos enfrentado desafíos
								técnicos y logísticos que han requerido soluciones creativas. Pero
								gracias a la colaboración y el trabajo en equipo, hemos logrado
								superar cada obstáculo y llevar adelante nuestro proyecto.
							</p>
						</section>
						<section className={styles['sobre-nosotros__section']}>
							<h2>Misión y visión</h2>
							{listaMision.map((lista, id) => {
								return <Lista texto={lista} key={id} />;
							})}
							<h4>Misión:</h4>
							<p>
								En Patitas a Casa nos dedicamos a rescatar y proteger a los
								animales abandonados o perdidos, y promover la adopción
								responsable de mascotas. A través de nuestras redes sociales,
								difundimos información para que los dueños puedan encontrar a sus
								mascotas y también para fomentar la adopción. Además, trabajamos
								con refugios para ayudar a que los animales encuentren un hogar y
								colaboramos con ellos para mejorar las condiciones de vida de los
								animales en situación de abandono. Nuestro objetivo es lograr un
								mundo más justo para los animales y concienciar a la sociedad
								sobre la importancia de su cuidado y protección.
							</p>
							<h4>Visión:</h4>
							<p>
								En Patitas a Casa trabajamos para construir una sociedad más
								empática y comprometida con la protección de los animales.
								Queremos ser una organización referente en el rescate y protección
								de animales, y en la promoción de la adopción responsable. A
								través de nuestras acciones, buscamos crear conciencia en la
								sociedad sobre la importancia de cuidar a los animales y
								contribuir a un cambio cultural que los considere seres sintientes
								y dignos de respeto. Aspiramos a un futuro donde los animales sean
								valorados y respetados por toda la sociedad y donde no haya
								animales en situación de abandono o maltrato.
							</p>
						</section>
					</article>
					{/* <article className={styles["sobre-nosotros__container"]}>
						<SobreNosotros 
							img={imgSobreNosotros}
							titulo="Lorem"
							texto="Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Enim sit qui, repudiandae aperiam laborum a quisquam in fugiat
							corrupti tenetur reprehenderit, harum, tempora pariatur expedita 
							excepturi saepe fugit eius nulla."
						/>
						<SobreNosotros 
							img={imgSobreNosotros}
							titulo="Lorem"
							texto="Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Enim sit qui, repudiandae aperiam laborum a quisquam in fugiat
							corrupti tenetur reprehenderit, harum, tempora pariatur expedita 
							excepturi saepe fugit eius nulla."
						/>
						<SobreNosotros 
							img={imgSobreNosotros}
							titulo="Lorem"
							texto="Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Enim sit qui, repudiandae aperiam laborum a quisquam in fugiat
							corrupti tenetur reprehenderit, harum, tempora pariatur expedita 
							excepturi saepe fugit eius nulla."
						/>
						<SobreNosotros 
							img={imgSobreNosotros}
							titulo="Lorem"
							texto="Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Enim sit qui, repudiandae aperiam laborum a quisquam in fugiat
							corrupti tenetur reprehenderit, harum, tempora pariatur expedita 
							excepturi saepe fugit eius nulla."
						/>
					</article> */}
				</section>

				{modal && <Formulario setModal={setModal} />}
		</>
	);
};