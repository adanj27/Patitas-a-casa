import { useEffect } from "react";
import shareIcon from '/icons/share-iconSubdata.png';
import whatsApp from '/icons/whatsAppSubdata.png';
import twitter from '/icons/twitter-icon.png';
import facebook from '/icons/facebook-icon.png';

import styles from './styles.module.css'

//Animate On Scroll
import AOS from 'aos';
import 'aos/dist/aos.css';

export const PerdidosTarjeta = ({ url_img, nombre, tam, zona, fecha, contacto, desc, encontrado }) => {

	useEffect(() => {
		AOS.init({
			offset: 200,
			duration: 600,
			easing: 'ease-in-sine',
			delay: 50,
			once: true,
		});
	}, []);

	return (
		<div className={styles.perdidosTarjeta} data-aos='fade'>
			<img
				className={styles.perdidosTarjeta__img}
				src={url_img}
				alt={`${nombre}-img`}
			/>
			<h3 style={{backgroundColor: encontrado ? "#f57969" : null}} className={styles.perdidosTarjeta__h3}>{encontrado ? 'Encontrado' : `Se perdió ${nombre}`}</h3>
			<div className={styles.perdidosTarjeta__subdata_container}>
				<SubData className={styles.perdidosTarjeta__subdata} subtitle="Tamaño" data={tam} />
				<SubData className={styles.perdidosTarjeta__subdata} subtitle="Zona" data={zona} />
				<SubData className={styles.perdidosTarjeta__subdata} subtitle="Contacto" data={contacto} />
				<SubData className={styles.perdidosTarjeta__subdata} subtitle="Descripción" data={desc} />
				<SubData className={styles.perdidosTarjeta__subdata} subtitle="Fecha" data={fecha} />
			</div>
			<div className={styles.perdidosTarjeta___img__info_container}>
				<img
					className={styles.perdidosTarjeta__img_info}
					src={whatsApp}
					alt="share-icon"
				/>
				<img
					className={styles.perdidosTarjeta__img_info}
					src={twitter}
					alt="share-icon"
				/>
				<img
					className={styles.perdidosTarjeta__img_info}
					src={facebook}
					alt="share-icon"
				/>
				<img
					className={styles.perdidosTarjeta__img_info}
					src={shareIcon}
					alt="share-icon"
				/>
			</div>
		</div>
	);
}

const SubData = ({ className, subtitle, data }) => {
	return (
		<p className={className}>
			<b>{subtitle}:</b>
			<span> {data}</span>
		</p>
	);
}
