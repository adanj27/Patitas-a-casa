import React from 'react';

// Css
import styles from './styles.module.css';

// Components
import { Logo } from '../Icons';

// Images
import PhoneIcon from "/icons/phone-call.png"
import MailIcon from "/icons/mail.png"
import FacebookIcon from "/icons/facebook-icon.png";
import TwitterIcon from "/icons/twitter-icon.png";
import InstagramIcon from "/icons/instagram-icon.png";
import YoutubeIcon from "/icons/youtube-icon.png";

export default function Footer() {
	return (
		<>
			<div className={`${styles["footer__line"]} ${styles["footer__line--top"]}`}></div>
			<footer className={styles.footer__container}>
				<Logo className={styles.footer__logo} />
				<p className={styles.footer__text}>
					"Esta es una herramienta creada para todas aquellas personas que han perdido a una mascota o que están buscando un nuevo miembro en la familia. No buscamos más que ayudar y poder contribuir con nuestros conocimientos y habilidades para brindar una mejor vida a estos animalitos, quienes entregan todo su amor sin esperar nada a cambio."
				</p>
				<div className={styles["footer__contact-container"]}>
					<p className={styles["footer__contact-title"]}>Contacto</p>
					<div className={styles["footer__contact"]}>
						<div className={styles["footer__contact--type"]}>
							<img className={styles["footer__contact--img"]} src={PhoneIcon} alt="icono telefono" />
							<p className={styles["footer__contact--text"]}>+1 909 764 0024</p>
						</div>
						<div className={styles["footer__contact--type"]}>
							<img className={styles["footer__contact--img"]} src={MailIcon} alt="icono telefono" />
							<p className={styles["footer__contact--text"]}>ejemplo@correo.com</p>
						</div>
					</div>
				</div>
				<div className={styles.footer__social}>
					<a href="#">
						<img className={styles["footer__social--icon"]} src={FacebookIcon} alt="icono facebook" />
					</a>
					<a href="#">
						<img className={styles["footer__social--icon"]} src={TwitterIcon} alt="icono twitter" />
					</a>
					<a href="#">
						<img className={styles["footer__social--icon"]} src={InstagramIcon} alt="icono instagram" />
					</a>
					<a href="#">
						<img className={styles["footer__social--icon"]} src={YoutubeIcon} alt="icono youtube" />
					</a>
				</div>
				<div className={styles.footer__line}></div>
				<div className={styles.footer__rights}>
					<a href="">
						<p>Términos y Condiciones</p>
					</a>
					<p className={styles["footer__rights--bar"]}>|</p>
					<p>Copyright &copy; 2023 oHm Devs</p>
				</div>
			</footer>
		</>
	);
}

