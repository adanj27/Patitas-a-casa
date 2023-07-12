// React
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

// Estilos
import styles from "./styles.module.css";

// Componentes
import BtnNav from "../BtnNav";
import { BtnPrincipal } from "../BtnPrincipal";
import { Formulario } from '../Formulario';
import { BurgerMenu } from "../BurgerMenu";

// Imágenes
import { Logo } from '../Icons';

/*
	Array formado de objetos que permite la creación
	de los botones a través de un map. Solo es necesario modificar
	o agregar elementos al array para modificar el nav.
*/
export const botones = [
	{ texto: "Inicio", path: "/" },
	{ texto: "Perdidos", path: "/perdidos" },
	{ texto: "Encontrados", path: "/encontrados" },
	{ texto: "Adoptar", path: "/adoptar" },
	{ texto: "Blog", path: "/blog" },
	{ texto: "Refugios", path: "/refugios" },
	{ texto: "Nosotros", path: "/nosotros" },
	{ texto: "Contacto", path: "/contacto" }
];

export const Navbar = () => {

	const [modal, setModal] = useState(false);
	const [isScrolling, setScrolling] = useState(false);

	useEffect(() => {
		function handleScroll() {
			const scroll = window.scrollY;
			const nav = document.getElementById("nav-var");
			if (nav) {
				if (scroll > 80) {
					nav.style.transform = `translateY(-100%)`;
					clearTimeout(isScrolling);
					setTimeout(() => {
						setScrolling(false);
						nav.style.transform = ``;
					}, 800);
				} else {
					nav.style.transform = `translateY(0%)`;
				}
			}
		}
		window.addEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav className={styles.nav} id='nav-var'>
			<div className={styles['nav-container']}>
				<NavLink to="/" className={styles["nav__logo-contenedor"]}>
					<Logo className={styles.logo} />
				</NavLink>
				<div className={styles.nav__contenedor}>
					<div className={styles['nav__contenedor-botones']}>
						{botones.map((btn, indice) => {
							return (
								<NavLink to={btn.path} key={indice}>
									{({ isActive }) => (
										<BtnNav
											clase={isActive ? 'btn--principal' : 'btn--secundario'}
											texto={btn.texto}
										/>
									)}
								</NavLink>
							);
						})}
					</div>
					{/* <div className={styles.nav__separador}></div> */}
				</div>
				<div className={styles['nav__contenedor-elementos']}>
					{/*<BtnLateral src={imgSearch} alt="Search" />
					<BtnLateral src={imgLogin} alt="Login" />*/}
					{/* <BtnPrincipal className={styles["nav__boton-reportar"]} texto="Reportar" setModal={setModal} /> */}
					<div className={styles["nav__contenedor-boton"]}>
						<BtnPrincipal texto="Reportar" setModal={setModal} />
					</div>
					<BurgerMenu />
				</div>
				{/*modal && <Formulario setModal={setModal} />*/}
				{modal ? (
					<Formulario setModal={setModal} />
				) : null}
			</div>
		</nav>
	);
}