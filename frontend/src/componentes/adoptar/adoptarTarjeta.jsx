import styles from '../../css/adoptar/adoptarTarjeta.module.css';
import shareIcon from '../../iconos/share-iconSubdata.png';
import whatsApp from '../../iconos/whatsAppSubdata.png';
import twitter from '../../iconos/twitterSubdata.png';
import facebook from '../../iconos/facebookSubdata.png';

//Animate On Scroll
import AOS from 'aos';
import 'aos/dist/aos.css';

const adoptarTarjeta = ({
	idNumber,
	img,
	nombre,
	descripcion,
	edad,
	refugio,
	contacto,
}) => {

	const animations = ["fade-left", "fade-right"];
	let animation = 'fade';
	//apply fade only if device is showing only one card on screen
	if (window.innerWidth > 1141) {
		animation = idNumber % 2 === 0 ? animations[1] : animations[0]
	}
	AOS.init({
		offset: 200,
		duration: 600,
		easing: 'ease-in-sine',
		delay: 50,
		once: true,
	});

	return (
		<div className={styles.adoptarTarjeta} data-aos={animation}>
			<div className={styles.adoptarTarjeta__img}>
				<img src={img} alt={`${img}-img`} />
			</div>
			<div className={styles.adoptarTarjeta__description}>
				<h3>Nombre: {nombre}</h3>
				<p>{descripcion}</p>
				<p>
					<b>Edad: {edad}</b>
				</p>
				<p>
					<b>Refugio: {refugio}</b>
				</p>
				<p>
					<b>Contacto: +{contacto}</b>
				</p>
				<div className={styles.adoptarTarjeta___img__info_container}>
					<img
						className={styles.adoptarTarjeta__img_info}
						src={whatsApp}
						alt="share-icon"
					/>
					<img
						className={styles.adoptarTarjeta__img_info}
						src={twitter}
						alt="share-icon"
					/>
					<img
						className={styles.adoptarTarjeta__img_info}
						src={facebook}
						alt="share-icon"
					/>
					<img
						className={styles.adoptarTarjeta__img_info}
						src={shareIcon}
						alt="share-icon"
					/>
				</div>
			</div>
		</div>
	);
};

export default adoptarTarjeta;
