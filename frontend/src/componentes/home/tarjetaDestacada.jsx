/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

// style import
import styles from "../../css/home/tarjetaDestacada.module.css";

// Modificar el tamaño de las imagenes
import instagram from "../../iconos/instagram.png"
import twitter from "../../iconos/twitter-sign.png"
import facebook from "../../iconos/facebook.png"

// asset import
import arrow from '../../iconos/arrow-down-sign-to-navigate.png'


//tarjeta destacada recibe como prop la imagen de la mascota. Se require algún contenedor de tarjetas para eso
const tarjetaDestacada = ({
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
			<article className={styles.card} onMouseOver={handleStateHover}>
				<div className={styles.cardNoExtended}>
					<img src={image} alt="mascota" />
					<p>{nombre}</p>
				</div>
				{stateHover && (
					<section className={styles.cardExtended}>
						<h3>Se perdió</h3>
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
				<button className={styles.cardButton}>
					<img src={arrow} alt="arrow" />
				</button>
			</article>
		</>
	);
};

export default tarjetaDestacada;