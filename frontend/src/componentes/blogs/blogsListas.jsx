import styles from '../../css/blogs/blogsListas.module.css';

export default function BlogsListas({ titulo, contenido = [] }) {
	return (
		<div className={styles.blogsListas__container}>
			<h4>{titulo}</h4>
			<ul>
				{contenido.map((v) => {
					return <li key={v}>{v}</li>;
				})}
			</ul>
		</div>
	);
}
