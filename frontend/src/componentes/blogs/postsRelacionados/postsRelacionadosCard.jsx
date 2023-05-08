import styles from '../../../css/blogs/postsRelacionados/postsRelacionadosCard.module.css';

export default function PostsRelacionadosCard({ img, titulo, descripcion }) {
	return (
		<div className={styles.postsRelacionadosCard__container}>
			<img src={img} alt={`${img}_img`} />
			<div className={styles.postsRelacionadosCard__data}>
				<h5>{titulo}</h5>
				<p>{descripcion}</p>
			</div>
		</div>
	);
}
