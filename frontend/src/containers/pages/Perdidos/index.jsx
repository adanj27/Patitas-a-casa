import styles from './styles.module.css'
import { Data } from '../../../data/HO-PET';
import { LetraParrafo, LetraSubtitulo, LetraTitulo, Paginacion } from '../../../components';
import { PerdidosTarjeta } from '../../../components/PerdidosTarjeta';
import { useEffect, useState } from "react";
import useGet from '../../../hooks/services/useGet';
import { PopupTarjeta } from '../../../components/PopupCard';

const Perdidos = () => {
	const { data, status } = useGet("form")
	const [lostPets, setLostPets] = useState([]);
	
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(10)

	const lastPostIndex = currentPage * postsPerPage
	const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = lostPets.slice(firstPostIndex, lastPostIndex)
  const totalPosts = lostPets.length;
	const totalPages = Math.ceil(totalPosts / postsPerPage);
	
	const TranslateSize = (size) => {
		switch (size) {
			case 'SMALL':
				return 'Pequeño';
			case 'MEDIUM':
				return 'Mediano';
			case 'LARGE':
				return 'Grande';
			// Puedes agregar más casos según tus necesidades
			default:
				return size; // Mantén el valor original si no coincide con los casos anteriores
		}
	};
	
	useEffect(() => {
		if (data) {
			// Filtrar los elementos con type_search igual a "LOST"
			const filteredLostPets = data.data.filter(item => item.type_search === 'LOST');
	
			// Actualizar el estado solo si los datos filtrados son diferentes a lostPets
			if (!areArraysEqual(filteredLostPets, lostPets)) {
				setLostPets(filteredLostPets);
			}
		}
	}, [data, lostPets]);
	
	// ...
	
	// Función para comparar dos arrays
	function areArraysEqual(arr1, arr2) {
		if (arr1.length !== arr2.length) {
			return false;
		}
	
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
	
		return true;
	}

	const [mostrarPopup, setMostrarPopup] = useState(false);
	const [datosPopup, setDatosPopup] = useState();

	const abrirPopup = (id) => {
		const perdidoData = lostPets.find((pet) => pet._id === id);
		setMostrarPopup(true);
		setDatosPopup(perdidoData);
};

const cerrarPopup = () => {
	setMostrarPopup(false);
};

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
						({ _id, name, size, loss_date, address, contact, description, image_url }) => {
							return (
								<PerdidosTarjeta
									key={_id}
									url_img={image_url}
									contacto={contact}
									desc={description}
									fecha={loss_date ? loss_date.split('T')[0] : ''}
									nombre={name}
									tam={TranslateSize(size)}
									zona={address}
									onOpen={() => abrirPopup(_id)}
								/>
							);
						}
					)}
					{mostrarPopup && <PopupTarjeta onClose={cerrarPopup} perdidoData={datosPopup} />}
				</section>
				<Paginacion 
					totalPosts={lostPets.length}
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

