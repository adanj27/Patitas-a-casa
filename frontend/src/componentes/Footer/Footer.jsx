import React from 'react';
import styles from '../../css/Footer/footer.module.css';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import Copyright from './Copyright';
import huellas from '../../iconos/imagen de fondo de huellas/bg-footer.png';

export default function Footer() {
	return (
		<footer>
			<div className={styles.footer__container}>
				<img className={styles.footer__huellas} src={huellas} alt="huellas" />
				<SectionOne
					title="HO-PET"
					parrafo="En Patitas a Casa, nos dedicamos a rescatar y proteger a los animales abandonados o perdidos, y promover la adopción responsable de mascotas. Somos una organización sin fines de lucro que utiliza las redes sociales para difundir información que ayude a los dueños a encontrar a sus mascotas perdidas, y a promover la adopción de animales en situación de abandono. Además, trabajamos con refugios para mejorar las condiciones de vida de los animales y ayudarlos a encontrar un hogar. Nuestra misión es construir una sociedad más empática y comprometida con la protección de los animales. ¡Únete a nuestra causa y ayúdanos a crear un mundo más justo para los animales!"
				/>
				<div className={styles.sectionTwo__container}>
					<SectionTwo
						title="Enlaces"
						enlaces={[
							'Blog',
							'FAQ',
							'Nosotros',
							'Contacto',
							'Únete',
							'Política de privacidad',
						]}
					/>
					<SectionTwo
						title="Contacto"
						contact={{
							tlf: ['+1 909 7640024'],
							emails: ['lorem@lorem.com', 'lorem@lorem.com'],
						}}
					/>
				</div>
				<SectionThree />
			</div>
			<Copyright year={2023} />
		</footer>
	);
}
