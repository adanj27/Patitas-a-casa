import icon from '../../iconos/arrow-down-sign-to-navigate.png';
import styles from '../../css/Perdidos/paginacion.module.css';

export default function Paginacion ({ enlaces=[] }) {
  return (
		<div className={styles.paginacion}>
			<div className={styles.paginacion__container}>
				<img
					className={styles.paginacion__img}
					src={icon}
					alt={`arrow-img`}
				/>
				{
					enlaces.map((value, index) => {
						return (
							<a key={index} className={styles.paginacion__a} href={`/${value}`}>
								{index + 1}
							</a>
						);
					})
				}
				<img
					className={styles.paginacion__img}
					src={icon}
					alt={`arrow-img`}
				/>
			</div>
		</div>
	);
}