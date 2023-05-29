import styles from './styles.module.css';

export const Portada = ({ img, titulo, consejos }) => {
	return (
		<div
			className={styles.blogsPortada__container}
			style={{ backgroundImage: `url(${img})` }}>
			{consejos ? (
				<div className={styles.blogsPortada__data}>
					<span>Consejos</span>
					<h2>{titulo}</h2>
				</div>
			) : (
				''
			)}
		</div>
	);
}
