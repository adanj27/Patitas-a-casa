import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

import { botones } from '../Nav';
import BurgerItem from './BurgerItem';
import { BtnPrincipal } from '../BtnPrincipal';
import { Formulario } from '../Formulario';
import { AuthFormContainer } from '../LoginForm';
import { LogoutIcon } from '../Icons';
import { useAuth } from '../../context/AuthContext';

export const BurgerMenu = () => {
  const { isAuthenticated, logout } = useAuth();
  const [login, setLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!divRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsOpen]);

  const handleLogout = () => {
    console.log('Haciendo logout...');
    logout();
    console.log(localStorage.getItem('token'));
  };

  return (
    <div className={styles.burger_menu}>
      <ul className={`${styles.burger_menu__items} ${isOpen && styles.open}`}>
        {botones.map((btn, indice) => {
          return (
            <li key={indice} onClick={() => setIsOpen(false)}>
              <BurgerItem to={btn.path} texto={btn.texto}></BurgerItem>
            </li>
          );
        })}
        <li>
          {isAuthenticated ? (
            <div className={styles['nav__contenedor-boton-user mobile_nav']}>
              <div
                onClick={handleLogout}
                className={styles['mobile_nav__logout']}
              >
                <LogoutIcon />
              </div>
              <BtnPrincipal texto="Reportar" setModal={setModal} />
            </div>
          ) : (
            <BtnPrincipal texto="Iniciar Sesión" setModal={setLogin} />
          )}
        </li>
      </ul>
      {login ? <AuthFormContainer setLogin={setLogin} /> : null}
      {modal ? <Formulario setModal={setModal} /> : null}
      <div
        className={`${styles.burger_menu__toggle} ${isOpen && styles.open}`}
        onClick={() => setIsOpen(!isOpen)}
        ref={divRef}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
