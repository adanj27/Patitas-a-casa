// React
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

// Estilos
import styles from "../../css/nav/nav.module.css";

// Componentes
import BtnNav from "./btnNav";
import BtnLateral from "./BtnLateral"
import BtnPrincipal from "../principales/btnPrincipal";
import Formulario from '../Formulario/formulario';

// Imágenes
import imgSeach from '../../iconos/search.png'
import login from '../../iconos/login.png';
import { Logo } from '../../iconos/svg/icons_svg';
import BurgerMenu from "./BurgerMenu/BurgerMenu";

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
	{ texto: "Contacto", path: "/contacto" }
];

const Nav = () => {

	const [modal, setModal] = useState(false)

	return (
		<nav className={styles.nav}>
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
					<div className={styles.nav__separador}></div>
					<div className={styles['nav__contenedor-elementos']}>
						{/*<BtnLateral src={imgSearch} alt="Search" />
					<BtnLateral src={imgLogin} alt="Login" />*/}
						<BtnPrincipal texto="Reportar" setModal={setModal} />
					</div>
					<BurgerMenu />
					{modal && <Formulario setModal={setModal} />}
				</div>
			</div>
		</nav>
	);
}

export default Nav;
