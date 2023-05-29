import React, { useState } from 'react';
import styles from '../../css/adoptar/filtrar.module.css';
// import Opcion from './opcion';
// import downIcon from '../../iconos/down-filled-triangular-arrow.png';



const Filtrar = () => {
	// const [verValores, setVerValores] = useState(false);

	const animals = ['Perros', 'Gatos', 'Pajaros', 'Conejos', 'Insectos'];

	const [isOpen, setIsOpen] = useState(false);
  const [haveText, setHaveText] = useState('');

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleText = (ev) => {
    setHaveText(ev.currentTarget.textContent);
  };

  const itemList = props => {
    const list = props.map((item) => (
      <div
        onClick={handleText}
        className={styles.dropdown__item}
        key={item.toString()}>
        {item}
      </div>
    ));

    return <div className={styles.dropdown__items}>{list}</div>;
  };

	return (
		// <div className={styles.filtrar}>
		// 	<input
		// 		className={styles.filtrar__input}
		// 		type="text"
		// 		onFocus={() => setVerValores(true)}
		// 		onBlur={() => setVerValores(false)}
		// 		placeholder="-- Todos --"
		// 		id="input"
		// 		readOnly="readonly"
		// 	/>
		// 	<img
		// 		className={styles.filtrar__down}
		// 		src={downIcon}
		// 		alt="down"
		// 		style={verValores ? { transform: 'rotate(180deg)' } : {}}
		// 		onClick={() => setVerValores(!verValores)}
		// 	/>
		// 	<div
		// 		className={styles.filter__option}
		// 		style={verValores ? { height: '140px' } : {}}
		// 	>
		// 		<Opcion tipo="-- Todos --" view={setVerValores} />
		// 		<Opcion tipo="Perros" view={setVerValores} />
		// 		<Opcion tipo="Gatos" view={setVerValores} />
		// 		<Opcion tipo="Pajaros" view={setVerValores} />
		// 		<Opcion tipo="Conejos" view={setVerValores} />
		// 		<Opcion tipo="Insectos" view={setVerValores} />
		// 	</div>
		// 	<button className={styles.filtrar__btn}>Filtrar</button>
		// </div>

		<div className={styles.dropdown__container}>
			<div className={isOpen ? `${styles.dropdown} ${styles.active}` : styles.dropdown} onClick={handleClick}>
				<div className={styles.dropdown__text}>{!haveText ? '--Todos--' : haveText}</div>
				{itemList(animals)}
			</div>
		</div>
	);
};

export default Filtrar;
