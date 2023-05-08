import styles from '../../css/blogs/blogsPortada.module.css';

export default function BlogsPortada({ img, titulo, consejos }) {
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
