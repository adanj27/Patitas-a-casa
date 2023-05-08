import React from 'react';
import styles from '../../css/principales/btnPrincipal.module.css';
import imgPaw from '../../iconos/paw.png';

const BtnPrincipal = ({ texto, setModal, action }) => {
	const handleSetModal = () => {
		if (texto === 'Reportar') {
			setModal(true);
		}
	};

	return texto === 'Enviar' ? (
		<button className={styles.btn}>
			<input type="submit" className={styles.btn__text} value={texto} />
			<img src={imgPaw} className={styles.btn__img} alt="buscador" />
		</button>
	) : (
		<button className={styles.btn} type="button" onClick={handleSetModal}>
			<p className={styles.btn__text}>{texto}</p>
			<img src={imgPaw} className={styles.btn__img} alt="buscador" />
		</button>
	);
};

export default BtnPrincipal;
