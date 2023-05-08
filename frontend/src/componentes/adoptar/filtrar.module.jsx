import { useState } from 'react';
import styles from '../../css/adoptar/filtrar.module.css';
import Opcion from './opcion';
import downIcon from '../../iconos/down-filled-triangular-arrow.png';

const Filtrar = () => {
	const [verValores, setVerValores] = useState(false);

	return (
		<div className={styles.filtrar}>
			<input
				className={styles.filtrar__input}
				type="text"
				onFocus={() => setVerValores(true)}
				placeholder="-- Todos --"
				id="input"
			/>
			<img
				className={styles.filtrar__down}
				src={downIcon}
				alt="down"
				style={verValores ? { transform: 'rotate(180deg)' } : {}}
			/>
			<div
				className={styles.filter__option}
				style={verValores ? { height: '140px' } : {}}>
				<Opcion tipo="-- Todos --" view={setVerValores} />
				<Opcion tipo="Perros" view={setVerValores} />
				<Opcion tipo="Gatos" view={setVerValores} />
				<Opcion tipo="Pajaros" view={setVerValores} />
				<Opcion tipo="Conejos" view={setVerValores} />
				<Opcion tipo="Insectos" view={setVerValores} />
			</div>
			<button className={styles.filtrar__btn}>Filtrar</button>
		</div>
	);
};

export default Filtrar;
