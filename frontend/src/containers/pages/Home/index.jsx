// React
import React, { useEffect, useState } from 'react';

// Css
import styles from './styles.module.css';

// Componentes
import { AdopcionesTarjetaContainer, BtnPrincipal, Formulario, LetraTitulo, Lista } from '../../../components';
import TarjetaDestacadaContainer from './components/TarjetaDestacadaContainer';
import {BlogContainer} from './components/BlogContainer';
import { LogoWhite } from '../../../components/Icons';
import { Stats } from "../../../components/Stats/index"

//LocalStorage 
import { updateLoadingStatus, getLoading } from '../../../localStorage/localStorage';

// React Router
import { Link } from "react-router-dom";

// React Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliderHeader.css"

// Imágenes
import headerImg1 from '/icons/imagenes recursos/header-img-1.webp';
import headerImg2 from '/icons/imagenes recursos/header-img-2.webp';
import headerImg3 from '/icons/imagenes recursos/header-img-3.webp';
import LogoPatita from "/icons/logo-patita.png"

// Iconos
import arrowLeft from "/icons/arrow-left.svg"
import arrowRight from "/icons/arrow-right.svg"

import sliderStyles from "../../../components/AdopcionesTarjetaContainer/styles.module.css";
import Loading from "../../../components/Loading/index";

const Home = () => {
	const [modal, setModal] = useState(false);
	const [isLoading, setIsLoading] = useState(getLoading());

	useEffect(() => {
		setTimeout(() => {
			updateLoadingStatus(false);
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

	const [currentSlide, setCurrentSlide] = useState(0);

	const settings = {
		dots: true,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: false,
		dotsClass: "button__bar",
		afterChange: (current) => {
      setCurrentSlide(current);
    },
	};

	return (
		<>
			{isLoading && 
				<Loading />
			}
			<header className={styles.header}>
				<Slider {...settings}>
					<div className={styles.header__slider}>
						<img className={styles["header__slider--img"]} src={headerImg1} alt="imagen slider header 1" loading="lazy"  />
						<section className={styles.header__section}>
							<div 
								className={`${styles.header__info} slide ${currentSlide === 0 ? "active" : ""}`}
								key={0}
							>
								<LogoWhite className={styles.header__logo} />
								<p className={styles.header__title}>"Rescatando patitas, salvando corazones"</p>
								<div className={styles.header__buttons}>
									<BtnPrincipal texto="Reportar" setModal={setModal} />
									<Link to="/adoptar">
										<BtnPrincipal texto="Adoptar" />
									</Link>
								</div>
							</div>
						</section>
					</div>
					<div className={styles.header__slider}>
						<img className={`${styles["header__slider--img"]} ${styles["slider__img--two"]}`} src={headerImg2} alt="imagen slider header 2" loading="lazy" />
						<div className={styles["header__slider--overlay"]}>
							<div 
								className={`${styles.header__info} slide ${currentSlide === 1 ? "active" : ""}`}
								key={1}
							>
								<div className={styles["header__info-heading"]}>
									<img className={styles["header__info--img"]} src={LogoPatita} alt="logo patita" loading="lazy" />
									<h2 className={styles["header__info--title"]}>¿Qué hacemos?</h2>
								</div>
								<p className={styles["header__info--text"]}>
									Nos encargamos de difundir, listar y dar mayor visibilidad a mascotas perdidas y en busca de un nuevo hogar
								</p>
							</div>
						</div>
					</div>
					<div className={styles.header__slider}>
						<img className={`${styles["header__slider--img"]} ${styles["slider__img--three"]}`} src={headerImg3} alt="imagen slider header 3" />
						<div className={styles["header__slider--overlay"]}>
							<div 
								className={`${styles.header__info} slide ${currentSlide === 2 ? "active" : ""}`}
								key={2}
							>
								<div className={styles["header__info-heading"]}>
									<img className={styles["header__info--img"]} src={LogoPatita} alt="logo patita" loading="lazy" />
									<h2 className={styles["header__info--title"]}>¿Quiénes somos?</h2>
								</div>
								<p className={styles["header__info--text"]}>
									Somos un equipo de desarrollo el cual compartimos la necesidad de ayudar a los animales que día a día nos brindan su amor incondicional
								</p>
							</div>
						</div>
					</div>
				</Slider>
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
						<Link to="/encontrados">
							<BtnPrincipal texto="Encontrados" />
						</Link>
						<Link to="/perdidos">
							<BtnPrincipal texto="Perdidos" />
						</Link>
					</div>
			</section>

			<Stats />

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

			<section>
				<LetraTitulo texto="BLOG" clase="letra-titulo--red" align="center" />
				<BlogContainer />
				<Link className={styles.blog__button} to="/blog">
					<BtnPrincipal texto="Ver más" />
				</Link>
			</section>

			{modal && <Formulario setModal={setModal} />}
		</>
	);
};

export default Home