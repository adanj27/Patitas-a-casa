import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import portadaR from './Imgs/portadaRP.png';

import aboutR1 from './Imgs/aboutR.png';
import aboutR2 from './Imgs/aboutR1.png';
import aboutR3 from './Imgs/aboutR2.png';

import workerR from './Imgs/workerR.png';

import dog1 from './Imgs/dog1.png';
import dog2 from './Imgs/dog2.png';
import dog3 from './Imgs/dog3.png';
import dog4 from './Imgs/dog4.png';

import refugioR from './Imgs/refugioR.png';

import { refugios } from '../../../../../refugios/refugiosData';

import styles from './styles.module.css';

const InformacionRefugio = () => {

    const { id } = useParams();

    return (
        <section className={styles['information-section']}>
            <header className={styles['information-section__header']}>
                <div>
                    <h2>{refugios[id].nombre}</h2>
                    <p>
                        Ubicación: <span>{refugios[id].ubicacion}</span>
                    </p>
                </div>
                {/* 
                    <div>
                    <img src={portadaR} alt="crowFunding post" />
                </div>
                */}
            </header>
            <article className={styles['information-section__content']}>
                <div className={styles['information-content__btns']}>
                    <button onClick={() => { window.open(refugios[id].donar.links[0], '_blank'); }}>
                        Donar
                    </button>
                    <button onClick={() => { window.open(refugios[id].socialMedia[0][1], '_blank'); }}>
                        Instagram
                    </button>
                    <button onClick={() => { window.open(refugios[id].socialMedia[3][1], '_blank'); }}>
                        Contacto
                    </button>
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
                        return  <img key={id} src={principalImg} alt={`Foto sobre`} />
                    })}
                </div>
                <div className={styles['information-content__information']}>
                    {/* Cada refugio tiene 6 secciones con información, si algun refugio no quiere que se muestre
                    esa sección entonces poner el numero de la sección en false y se ocultara */}
                   {
                        refugios[id].section3 ? 
                        <div>
                            <h3>
                                Las personas que trabajan aqui
                            </h3>
                            <p>
                                ros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in feugiat ex eu
                            </p>
                            <img src={workerR} alt="trabajadores" />
                        </div>
                        :
                        <div></div>
                   }

                    <div>
                        <h3>
                            Las mascotas a las que le dan techo
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                        </p>
                        <div>
                            {refugios[id].pictures.mascotas.map((petImg, id) => {
                                return <img key={id} src={petImg} alt="Mascota de casita de lula" />
                            })}
                        </div>
                    </div>

                    <div className={styles['information-content__donate']}>
                        <h3>
                            Con lo que puedas aporta
                            <ol>Mantas</ol>
                            <ol>Colchones </ol>
                            <ol>Alimentos </ol>
                            <ol>Medicamentos </ol>
                            <ol>Dinero </ol>
                            
                        </h3>
                        <p>
                            Podes colaborar no solamente con dinero también muchas veces cosas que te sobran en tu casa como colchones viejos, mantas o medicamentos como desparasitantes, aportas muchísimo.
                        </p>
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
                        <h3>
                            Contacto
                        </h3>
                        <ol>
                            {refugios[id].socialMedia.map((social, id) => {
                                return (
                                    <li key={id}>
                                        <p onClick={() => { window.open(social[1], '_blank'); }}>
                                            <span><i class={social[2]}></i></span>
                                            {social[0]}
                                        </p>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
                <div className={styles['information-content__final']}>
                    <img src={refugioR} alt="imagen del refugio" />
                </div>
            </article>
        </section>
    );
};

export default InformacionRefugio