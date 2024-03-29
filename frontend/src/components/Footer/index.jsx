import React from 'react';

// Css
import styles from './styles.module.css';

// Components
import { Logo, TwitterIconX, ThreadsIcon } from '../Icons';

// Images
// import ThreadsIcon from "/icons/threads.svg"
import MailIcon from "/icons/mail.png"
import FacebookIcon from "/icons/facebook-icon.png";
import InstagramIcon from "/icons/instagram-icon.png";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<>
			<div className={styles["footer__line--top"]}></div>
			<footer className={styles.footer__container}>
				<Logo className={styles.footer__logo} />
				<p className={styles.footer__text}>
					"Esta es una herramienta creada para todas aquellas personas que han perdido a una mascota o que están buscando un nuevo miembro en la familia. No buscamos más que ayudar y poder contribuir con nuestros conocimientos y habilidades para brindar una mejor vida a estos animalitos, quienes entregan todo su amor sin esperar nada a cambio."
				</p>
				<div className={styles["footer__contact-container"]}>
					<p className={styles["footer__contact-title"]}>Contacto</p>
					<div className={styles["footer__contact"]}>
						{/* <div className={styles["footer__contact--type"]}>
							<img className={styles["footer__contact--img"]} src={PhoneIcon} alt="icono telefono" loading="lazy" />
							<p className={styles["footer__contact--text"]}>+54 261-257-2860</p>
						</div> */}
						<div className={styles["footer__contact--type"]}>
							<img className={styles["footer__contact--img"]} src={MailIcon} alt="icono telefono" loading="lazy" />
							<p className={styles["footer__contact--text"]}>patitasacasaorg@gmail.com</p>
						</div>
					</div>
				</div>
				<div className={styles.footer__social}>
					<a href="https://www.facebook.com/profile.php?id=61552147730427&mibextid=ZbWKwL" target="_blank">
						<img className={styles["footer__social--icon"]} src={FacebookIcon} alt="icono facebook" loading="lazy" />
					</a>
          <a href="https://twitter.com/PatitasaCasaORG" target="_blank" className={styles["footer__social_twitter-x-container"]}>
            <div className={styles["footer__social_twitter-x-icon"]}>
              <TwitterIconX />
            </div>
          </a>
					<a href="https://www.instagram.com/patitasacasa_org/" target="_blank">
						<img className={styles["footer__social--icon"]} src={InstagramIcon} alt="icono instagram" loading="lazy" />
					</a>
					<a href="https://www.threads.net/@patitasacasa_org" target="_blank" className={styles["footer__social_twitter-x-container"]}>
            <div className={styles["footer__social_threads-icon"]}>
							<ThreadsIcon />
            </div>
          </a>
				</div>
				<div className={styles.footer__line}></div>
				<div className={styles.footer__rights}>
					<Link to="terminos-y-condiciones">
						<p>Términos y Condiciones</p>
					</Link>
					<p className={styles["footer__rights--bar"]}>|</p>
					<p>Copyright &copy; 2023 <a href="https://www.linkedin.com/company/ohm-devs/" target="_blank">oHm Devs</a></p>
				</div>
			</footer>
		</>
	);
}

