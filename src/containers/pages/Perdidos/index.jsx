import styles from './styles.module.css'
import { Data } from '../../../data/HO-PET';
import { LetraParrafo, LetraSubtitulo, LetraTitulo, Paginacion } from '../../../components';
import { PerdidosTarjeta } from '../../../components/PerdidosTarjeta';

export const Perdidos = () => {
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

