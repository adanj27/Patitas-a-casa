/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import styles from '../../css/Formulario/formulario.module.css';

import dog from '../../iconos/imagenes recursos/dog-seating.png';
import pet from '../../iconos/imagenes recursos/pet.png';
import close from '../../iconos/imagenes recursos/close.png';
import bg from '../../iconos/imagenes recursos/bg_form.webp';

/**
 Petype = es un booleano que indica si el formulario es para reportar una mascota
 perdida o si es para reportar una mascota encontrada
 */

const formulario = ({ setModal }) => {
	const [petType, setPetType] = useState(true);
	const [file, setFile] = useState(false);
	const [uploadImgHover, setUploadImgHover] = useState(false);

	const handleSubmit = () => {
		// Falta implementar el metodo post desde la API
		// Si petype = true se agrega el formulario a las mascotas perdidas
		return petType ? 1 : 0;
	};

	const handleCancel = () => {
		setModal(false);
	};

	return (
		<div className={styles.formContainer}>
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
						{ petType ? <input type="text" name="name" placeholder="Nombre" /> : '' }
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
	);
};

export default formulario;
