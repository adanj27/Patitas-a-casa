import { Data } from '../../../data/HO-PET'
import { LetraParrafo, LetraSubtitulo, LetraTitulo, Paginacion, PerdidosTarjeta } from '../../../components';
 import styles from './styles.module.css'

export const Encontrados = () => {
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

