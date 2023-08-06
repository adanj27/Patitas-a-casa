/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

// style import
import styles from './styles.module.css';

// Modificar el tamaño de las imagenes
import instagram from "/icons/instagram.png"
import twitter from "/icons/twitter-sign.png"
import facebook from "/icons/facebook.png"

// asset import
import arrow from '/icons/arrow-down-sign-to-navigate.png'

//tarjeta destacada recibe como prop la imagen de la mascota. Se require algún contenedor de tarjetas para eso
export const TarjetaDestacada = ({
	nombre,
  image,
	length,
	date,
	place,
	contact,
	description,
}) => {
	const [stateHover, setStateHover] = useState(false);
	const handleStateHover = () => {
		setStateHover(true);
	};
	return (
		<>
			<div className={styles.card__container}>
				<div className={styles.card} onMouseOver={handleStateHover}>
					<div className={styles.cardNoExtended}>
						<img src={image} alt="mascota" loading="lazy" />
						<p>{nombre}</p>
					</div>
					{stateHover && (
						<section className={styles.cardExtended}>
							<h3>Perdido</h3>
							<ul>
								<li>
									<b>Tamaño:</b> {length}
								</li>
								<li>
									<b>Zona:</b> {place}
								</li>
								<li>
									<b>Fecha:</b> {date}
								</li>
								<li>
									<b>Contacto:</b> {contact}
								</li>
								<li>
									<b>Descripción:</b> {description}
								</li>
							</ul>
							<address></address>
						</section>
					)}
					{/* <button className={styles.cardButton}>
						<img src={arrow} alt="arrow" />
					</button> */}
				</div>
			</div>
		</>
	);
};

