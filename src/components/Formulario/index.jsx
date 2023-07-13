/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react';

import styles from "./styles.module.css"

import dog from '/icons/imagenes recursos/dog-seating.png';
import pet from '/icons/imagenes recursos/pet.png';
import close from '/icons/imagenes recursos/close.png';


// hooks
import usePost from '../../hooks/services/usePost';
/**
 Petype = es un booleano que indica si el formulario es para reportar una mascota
 perdida o si es para reportar una mascota encontrada
 */

export const Formulario = ({ setModal }) => {
	const [petType, setPetType] = useState(true);
	const [file, setFile] = useState(false);
	const [uploadImgHover, setUploadImgHover] = useState(false);

	const bodyRef = useRef(null);
	const reportFormRef = useRef();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(reportFormRef.current);
		// Descomentarlo cuando haya API de formulario
		// const url = petType ? '/urlParaPerros': '/urlParaMichis';
		// usePost(url, data) 
		return petType ? 1 : 0;
	};

	//ends the animation
	const handleCancel = (e) => {
		e.preventDefault();
		if (reportFormRef.current) {
			setTimeout(() => {
				reportFormRef.current.style.transform = 'translateY(5%)';
				reportFormRef.current.style.opacity = '0';
			}, 10);
		}
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	//starts the animation
	useEffect(() => {
		if (reportFormRef.current) {
			setTimeout(() => {
				reportFormRef.current.style.transform = 'translateY(0)';
				reportFormRef.current.style.opacity = '1';
			}, 10);
		}
	}, []);

	useEffect(() => {
		bodyRef.current = document.body;
		if (bodyRef.current) {
			bodyRef.current.style.overflowY = 'hidden';
		}
		return () => {
			bodyRef.current.style.overflowY = 'visible';
		};
	}, []);

	return (
		<div className={styles['report-container']}>
			<div ref={reportFormRef} className={styles.formContainer}>
				<form
					action="POST"
					onSubmit={handleSubmit}
					className={styles.form}>
					<div className={styles.headerForm}>
						<div
							style={{ borderRadius: '8px 0 0 0' }}
							className={petType ? styles.petSelected : styles.pet}
							onClick={() => setPetType(true)}>
							<img src={dog} alt="dog draw" /> Perdido
						</div>
						<div
							className={!petType ? styles.petSelected : styles.pet}
							onClick={() => setPetType(false)}>
							<img src={pet} alt="pet draw" /> Encontrado
						</div>
						<button className={styles.cancelButton} onClick={handleCancel}>
							<img src={close} alt="close-icon" />
						</button>
					</div>
					<div className={styles.mainForm}>
						<div className={styles.buttonFile}>
							<label
								style={
									uploadImgHover
										? { backgroundColor: 'rgba(222, 52, 29, 0.5)' }
										: {}
								}>
								{file ? `Foto subida` : `Subir foto`}
							</label>
							<input
								type="file"
								accept=".jpg, .jpeg, .png"
								id="petFile"
								className={styles.buttonFile}
								onInput={() => setFile(true)}
								onMouseEnter={() => setUploadImgHover(true)}
								onMouseLeave={() => setUploadImgHover(false)}
							/>
						</div>
						<section className={styles.form_inputs}>
							{petType ? <input type="text" name="name" placeholder="Nombre" /> : ''}
							<div>
								<input type="text" name="size" placeholder="Tamaño" />
								<input type="text" name="zone" placeholder="Zona" />
							</div>
							<div>
								<input type="tel" name="contact" placeholder="Contacto" />
								<input type="date" name="date" placeholder="Fecha" />
							</div>
						</section>
						<h3>Descripción</h3>
						<textarea name="description" cols="30" rows="10"></textarea>
						<button onClick={handleSubmit} className={styles.submitButon}>
							Enviar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};