import PostsRelacionadosCard from "./postsRelacionadosCard";
import styles from '../../../css/blogs/postsRelacionados/postsRelacionados.module.css';

export default function PostsRelacionados ({ pots=[] }) {
  return (
		<div className={styles.postsRelacionados__container}>
			<h4>Posts Relacionados</h4>
			<div className={styles.postsRelacionados__card}>
				<PostsRelacionadosCard
					img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
					titulo="CONSEJOS"
					descripcion="Filariosis canina: qué es, síntomas y tratamiento"
				/>
				<PostsRelacionadosCard
					img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
					titulo="CONSEJOS"
					descripcion="Filariosis canina: qué es, síntomas y tratamiento"
				/>
				<PostsRelacionadosCard
					img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
					titulo="CONSEJOS"
					descripcion="Filariosis canina: qué es, síntomas y tratamiento"
				/>
			</div>
		</div>
	);
}