import SubData from "./subData";
import shareIcon from '../../iconos/share-iconSubdata.png';
import whatsApp from '../../iconos/whatsAppSubdata.png';
import twitter from '../../iconos/twitterSubdata.png';
import facebook from '../../iconos/facebookSubdata.png';
import styles from '../../css/Perdidos/perdidosTarjeta.module.css';

export default function PerdidosTarjeta({ url_img, nombre, tam, zona, fecha, contacto, desc, encontrado }) {
	return (
		<div className={styles.perdidosTarjeta}>
			<img
				className={styles.perdidosTarjeta__img}
				src={url_img}
				alt={`${nombre}-img`}
			/>
			<h3 className={styles.perdidosTarjeta__h3}>{encontrado ? 'Encontrado' : `Se perdió ${nombre}`}</h3>
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