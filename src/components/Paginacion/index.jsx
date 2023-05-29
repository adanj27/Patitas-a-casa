import icon from '/icons/arrow-down-sign-to-navigate.png';
import styles from './styles.module.css';

export const Paginacion = ({ enlaces=[] }) => {
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
