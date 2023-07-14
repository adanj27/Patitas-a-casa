import React, { useState } from 'react';
import styles from './styles.module.css';

export const Filtrar = () => {
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
		<div className={styles.dropdown__container}>
			<div className={isOpen ? `${styles.dropdown} ${styles.active}` : styles.dropdown} onClick={handleClick}>
				<div className={styles.dropdown__text}>{!haveText ? '--Todos--' : haveText}</div>
				{itemList(animals)}
			</div>
		</div>
	);
};