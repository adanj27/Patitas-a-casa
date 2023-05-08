import React from 'react';
import Nav from '../componentes/nav/nav';
import Footer from '../../src/componentes/Footer/Footer';
import styles from '../css/Perdidos/perdidos.module.css';
import PerdidosTarjeta from '../componentes/Perdidos/perdidosTarjeta';
import LetraTitulo from '../componentes/principales/LetraTitulo';
import { LetraSubtitulo } from '../componentes/principales/LetraTitulo';
import { Data } from '../Data_HO-PET';
import Paginacion from '../componentes/Perdidos/paginacion';
import LetraParrafo from '../componentes/principales/letraParrafo';

const Encontrados = () => {
	return (
		<>
			<div className={styles.perdidos}>
				<section className={styles['texto-container']}>
					<article className={styles['texto-container__titulo']}>
						<LetraTitulo
							texto="Mascotas Encontradas"
							clase="letra-titulo--red"
						/>
						<LetraSubtitulo
							texto="devuelve a tu amigo peludo a casa"
							clase="letra-titulo--red"
						/>
					</article>
					<article className={styles['texto-container__subtitulo']}>
						<LetraParrafo
							texto="“Mascotas encontradas en busca de su dueño. Contacta al número en el afiche para reunirlas.”"
							clase="letra-parrafo--black"
						/>
					</article>
				</section>
				<section className={styles.perdidos__tarjeta_container}>
					{Data.map(
						({
							id,
							nombre,
							tamaño,
							fecha,
							lugar,
							contacto,
							descripcion,
							imagen,
						}) => {
							return (
								<PerdidosTarjeta
									key={id}
									url_img={imagen}
									contacto={contacto}
									desc={descripcion}
									fecha={fecha}
									nombre={nombre}
									tam={tamaño}
									zona={lugar}
									encontrado={true}
								/>
							);
						}
					)}
				</section>
				<Paginacion enlaces={['', '', '', '', '']} />
			</div>
		</>
	);
};

export default Encontrados;
