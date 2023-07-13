import styles from "./styles.module.css";

export const Card = ({ id, img, consejo, titulo, descripcion, fecha }) => {
	return (
		<a href={`/blogs/${id}`} className={styles.cardContainer}>
			<img src={img} alt={`${img}_img`} />
			<div className={styles.cardContainer__content}>
				<span className={styles.cardContainer__consejo}>{consejo}</span>
				<div className={styles.cardContainer__data}>
					<h2 className={styles.cardContainer__titulo}>{titulo}</h2>
					<p className={styles.cardContainer__descripcion}>{descripcion}</p>
				</div>
				<span className={styles.cardContainer__fecha}>{fecha}</span>
			</div>
		</a>
	);
};

