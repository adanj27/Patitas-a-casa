import styles from './styles.module.css'
import { Data } from '../../../data/HO-PET';
import { LetraParrafo, LetraSubtitulo, LetraTitulo, Paginacion } from '../../../components';
import { PerdidosTarjeta } from '../../../components/PerdidosTarjeta';
import { useState } from "react";

const Perdidos = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(10)

	const lastPostIndex = currentPage * postsPerPage
	const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = Data.slice(firstPostIndex, lastPostIndex)
  const totalPosts = Data.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

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
					{currentPosts.map(
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
				<Paginacion 
					totalPosts={Data.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
				/>
			</div>
		</>
	);
};

export default Perdidos

