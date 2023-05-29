import styles from './styles.module.css';

export const Posts = ({ pots=[] }) => {
  return (
		<div className={styles.postsRelacionados__container}>
			<h4>Posts Relacionados</h4>
			<div className={styles.postsRelacionados__card}>
				<PostsCard
					img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
					titulo="CONSEJOS"
					descripcion="Filariosis canina: qué es, síntomas y tratamiento"
				/>
				<PostsCard
					img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
					titulo="CONSEJOS"
					descripcion="Filariosis canina: qué es, síntomas y tratamiento"
				/>
				<PostsCard
					img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
					titulo="CONSEJOS"
					descripcion="Filariosis canina: qué es, síntomas y tratamiento"
				/>
			</div>
		</div>
	);
}

const PostsCard = ({ img, titulo, descripcion }) => {
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
