import React from 'react';
import Nav from '../componentes/nav/nav';
import Footer from '../componentes/Footer/Footer';
import styles from '../css/contacto/contacto.module.css';
import LetraTitulo from '../componentes/principales/LetraTitulo';
import LetraParrafo from '../componentes/principales/letraParrafo';
import BtnPrincipal from '../componentes/principales/btnPrincipal';

const Contacto = () => {
	return (
		<div className={styles['contenedor-principal']}>
			{/* <Nav /> */}
			<form action="/" className={styles.contacto}>
				<div className={styles['contacto__container']}>
					<LetraTitulo
						texto="Contactate con nosotros"
						clase="letra-titulo--red"
						align="center"
					/>
					<LetraParrafo
						texto={
							'Una gran visión sin grandes personas es irrelevante.\nTrabajemos juntos.'
						}
						clase="letra-parrafo--black"
					/>
					<div className={styles.contacto__inputs}>
						<input
							name="nombre"
							type="text"
							placeholder="Nombre (*)"
							className={styles.contacto__input}
							required
						/>
						<input
							name="apellido"
							type="text"
							placeholder="Apellido (*)"
							className={styles.contacto__input}
							required
						/>
						<input
							name="email"
							type="email"
							placeholder="Email (*)"
							className={styles.contacto__input}
							required
						/>
						<input
							name="telefono"
							type="number"
							placeholder="Teléfono (*)"
							className={styles.contacto__input}
							required
						/>
						<textarea
							name="mensaje"
							type="text"
							placeholder="Mensaje (*)"
							className={styles.contacto__textarea}
							required
							maxLength="300"
						/>
					</div>
					<p className={styles.contacto__parrafo}>Hasta 300 caracteres</p>
					<BtnPrincipal texto="Enviar" />
				</div>
			</form>
		</div>
	);
};

export default Contacto;
