// React
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// Estilos
import styles from './styles.module.css';

// Componentes
import BtnNav from '../BtnNav';
import { BtnPrincipal } from '../BtnPrincipal';
import { Formulario } from '../Formulario';
import { BurgerMenu } from '../BurgerMenu';
// import BtnLateral from '../BtnLateral';

// Imágenes
import { Logo, LogoutIcon } from '../Icons';
import { AuthFormContainer } from '../LoginForm';

import { useAuth } from '../../context/AuthContext';

/*
	Array formado de objetos que permite la creación
	de los botones a través de un map. Solo es necesario modificar
	o agregar elementos al array para modificar el nav.
*/
export const botones = [
  { texto: 'Inicio', path: '/' },
  { texto: 'Perdidos', path: '/perdidos' },
  { texto: 'Encontrados', path: '/encontrados' },
  { texto: 'Adoptar', path: '/adoptar' },
  { texto: 'Blog', path: '/blog' },
  { texto: 'Refugios', path: '/refugios' },
  { texto: 'Nosotros', path: '/nosotros' },
  { texto: 'Contacto', path: '/contacto' },
];

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [modal, setModal] = useState(false);
	const [isScrolling, setScrolling] = useState(false);
	const [login, setLogin] = useState(false)

  useEffect(() => {
    let timeoutId;

    function handleScroll() {
      clearTimeout(timeoutId);
      setScrolling(true);

      timeoutId = setTimeout(() => {
        setScrolling(false);
      }, 500);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    console.log('Haciendo logout...');
    logout();
    console.log(localStorage.getItem('token'));
  };

  return (
    <nav
      className={`${styles.nav} ${isScrolling ? styles.hidden : ''}`}
      id="nav-var"
    >
      <div className={styles['nav-container']}>
        <NavLink to="/" className={styles['nav__logo-contenedor']}>
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
					{/*<BtnLateral src={imgSearch} alt="Search" />*/}
          {/* <BtnPrincipal className={styles["nav__boton-reportar"]} texto="Reportar" setModal={setModal} /> */}
          <div className={styles['nav__contenedor-boton']}>
						{isAuthenticated ? (
							
							<div className={styles['nav__contenedor-boton-user']}>
                <div onClick={handleLogout}>
                <LogoutIcon />
                </div>
								<BtnPrincipal texto="Reportar" setModal={setModal} />
							</div>
							) : (
              <BtnPrincipal texto="Iniciar Sesión" setModal={setLogin} />
            )}
          </div>
          <BurgerMenu />
				</div>
				{login ? <AuthFormContainer setLogin={setLogin} /> : null}
        {/*modal && <Formulario setModal={setModal} />*/}
        {modal ? <Formulario setModal={setModal} /> : null}
      </div>
    </nav>
  );
};
