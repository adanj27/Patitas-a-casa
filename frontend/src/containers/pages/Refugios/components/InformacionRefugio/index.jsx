import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BannerLula from './Imgs/bannerlula.png';
import LogoLula from './Imgs/La-Casita-De-Lula.png';

import aboutR1 from './Imgs/aboutR.png';
import aboutR2 from './Imgs/aboutR1.png';
import aboutR3 from './Imgs/aboutR2.png';

import workerR from './Imgs/workerR.png';

import dog1 from './Imgs/dog1.png';
import dog2 from './Imgs/dog2.png';
import dog3 from './Imgs/dog3.png';
import dog4 from './Imgs/dog4.png';

import pawIcon from '/icons/paw.png';

import backIcon from '/icons/atras.png';

import refugioR from './Imgs/refugioR.png';

import { refugios } from '../../../../../refugios/refugiosData';

import styles from './styles.module.css';

const InformacionRefugio = () => {
  const { id } = useParams();

  return (
    <section className={styles['information-section']}>
      <header className={styles['information-section__header']}>
        <a className={styles['back-button']} href="/socios">
          <img src={backIcon} alt="icono atras" />
        </a>
        <div className={styles['information-section__header--banner']}>
          <div></div>
          <div className={styles['information-section__header--banner-title']}>
            <img src={LogoLula} alt="La casita de Lula" />
            <div>
              <h2>{refugios[id].nombre}</h2>
              <p>
                Ubicación: <span>{refugios[id].ubicacion}</span>
              </p>
            </div>
          </div>
          <img src={BannerLula} alt="crowFunding post" />
        </div>
        {/* 
                    <div>
                </div>
                */}
      </header>
      <article className={styles['information-section__content']}>
        <div className={styles['information-content__btns']}>
          <div>
            <button
              onClick={() => {
                window.open(refugios[id].socialMedia[0][1], '_blank');
              }}
            >
              Instagram
            </button>
            <button
              onClick={() => {
                window.open(refugios[id].donar.links[0], '_blank');
              }}
            >
              <img src={pawIcon} alt="icono patita" />
              Donar
            </button>
            <button
              onClick={() => {
                window.open(refugios[id].socialMedia[3][1], '_blank');
              }}
            >
              Contacto
            </button>
          </div>
        </div>
        <div className={styles['information-content__about']}>
          <div>
            <h3>Quienes son?</h3>
            <p>
              {refugios[id].acerca}
              {/*El Refugio Esperanza es un refugio para animales ubicado en las afueras de la ciudad de Harmonyville. El refugio abarca un terreno amplio y cuenta con instalaciones modernas y cómodas para albergar a los animales. Se esfuerza por ser un lugar acogedor y seguro donde los animales sin hogar, maltratados o abandonados puedan recibir cuidado y encontrar un hogar amoroso. */}
            </p>
          </div>
          <div>
            <h3>Su historia</h3>
            <p>
              {refugios[id].historia}
              {/*El Refugio Esperanza nació de la visión de un grupo de amigos apasionados por el bienestar animal y comprometidos con brindar una segunda oportunidad a los animales necesitados. Fue fundado en el año 2022 con el objetivo de proporcionar un lugar seguro y amoroso para los animales sin hogar, maltratados o abandonados en la ciudad ficticia de Harmonyville.*/}
            </p>
          </div>
        </div>
        <div className={styles['information-content__imgs']}>
          {refugios[id].pictures.principal.map((principalImg, id) => {
            return <img key={id} src={principalImg} alt={`Foto sobre`} />;
          })}
        </div>
        <div className={styles['information-content__information']}>
          {/* Cada refugio tiene 6 secciones con información, si algun refugio no quiere que se muestre
                    esa sección entonces poner el numero de la sección en false y se ocultara */}
          {refugios[id].section3 ? (
            <div>
              <h3>Las personas que trabajan aqui</h3>
              <p>
                ros tempus lacinia. Nam bibendum pellentesque quam a convallis.
                Sed ut vulputate nisi. Integer in feugiat ex eu
              </p>
              <img src={workerR} alt="trabajadores" />
            </div>
          ) : (
            <div></div>
          )}

          <div className={styles['information-content__pets']}>
            <h3>Las mascotas a las que le dan techo</h3>
            <p>
              ros tempus lacinia. Nam bibendum pellentesque quam a convallis.
              Sed ut vulputate nisi. Integer in felis sed leo vestibulum
              venenatis. Suspendisse um pellentesque quam a convallis. Sed ut
              vulputate nisi. Integer in felis sed leo vestibulum venenatis.
              Suspendisse quis arcu sem. Aenean feugiat ex eu
            </p>
            <div>
              {refugios[id].pictures.mascotas.map((petImg, id) => {
                return (
                  <img key={id} src={petImg} alt="Mascota de casita de lula" />
                );
              })}
            </div>
          </div>

          <div className={styles['information-content__donate']}>
            <div>
              <h4>Con lo que puedes aportar</h4>
              <p>
                Esta es una lista de insumos que nos pueden venir de muchisimas
                ayuda para darle a un monton de mascotas que lo necesitan en
                nuestro refugio:
              </p>
              <ul>
                <li>♦ Mantas</li>
                <li>♦ Colchones</li>
                <li>♦ Alimentos</li>
                <li>♦ Medicamentos</li>
                <li>♦ Dinero</li>
              </ul>
            </div>
            <ol>
              {refugios[id].donar.elementos.map((type, id) => {
                return (
                  <li key={id}>
                    <p>{type}</p>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className={styles['information-content__contact']}>
            <h3>Contacto</h3>
            <ol>
              {refugios[id].socialMedia.map((social, id) => {
                return (
                  <li key={id}>
                    <p
                      onClick={() => {
                        window.open(social[1], '_blank');
                      }}
                    >
                      <span>
                        {social[2].endsWith('.svg') ? (
                          // Usar el componente MiComponente para SVG personalizado
                          <img src={social[2]} alt="" />
                        ) : (
                          // Usar la clase de Font Awesome
                          <i className={social[2]}></i>
                        )}
                      </span>
                      {social[0]}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        {/* <div className={styles['information-content__final']}>
          <img src={refugioR} alt="imagen del refugio" />
        </div> */}
      </article>
    </section>
  );
};

export default InformacionRefugio;
