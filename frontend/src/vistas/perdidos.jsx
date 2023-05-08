import React from 'react';
import Nav from '../componentes/nav/nav';
import Footer from '../../src/componentes/Footer/Footer';
import styles from '../css/Perdidos/perdidos.module.css';
import PerdidosTarjeta from '../componentes/Perdidos/perdidosTarjeta';
import LetraTitulo, { LetraSubtitulo } from '../componentes/principales/LetraTitulo';
import { Data } from '../Data_HO-PET';
import Paginacion from '../componentes/Perdidos/paginacion';
import LetraParrafo from '../componentes/principales/letraParrafo';

const Perdidos = () => {
	return (
		<>
			<div className={styles.perdidos}>
				<section className={styles['texto-container']}>
					<article className={styles['texto-container__titulo']}>
						<LetraTitulo
							texto="Mascotas Perdidas"
							clase="letra-titulo--red"
						/>
						<LetraSubtitulo
							texto="Ayuda a encontrar a tu amigo peludo"
							clase="letra-titulo--red"
						/>
					</article>
					<article className={styles['texto-container__subtitulo']}>
						<LetraParrafo
							texto="“Encuentra información sobre mascotas perdidas y colabora en su búsqueda. Ayuda a reunir a las mascotas con sus dueños compartiendo información aquí.”"
							clase="letra-parrafo--black"
						/>
					</article>
				</section>
				<section className={styles.perdidos__tarjeta_container}>
					{Data.map(
						({ id, nombre, tamaño, fecha, lugar, contacto, descripcion, imagen }) => {
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

export default Perdidos;
