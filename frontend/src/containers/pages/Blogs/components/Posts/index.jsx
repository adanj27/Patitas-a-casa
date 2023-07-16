import styles from './styles.module.css';
import { blogData } from "../../../../../data/blogs";

export const Posts = ({ posts }) => {

	const filteredBlogs = blogData.filter(pro => pro.category === posts);

  return (
		<div className={styles.postsRelacionados__container}>
			<h4>Posts Relacionados</h4>
			<div className={styles.postsRelacionados__card}>
			{filteredBlogs && filteredBlogs.slice(0, 4).map((pro, index) => <PostsCard key={index} img={pro.imageBanner} titulo={pro.category} title={pro.title} />)}
				
			</div>
		</div>
	);
}

const PostsCard = ({ img, titulo, title }) => {
	return (
		<div className={styles.postsRelacionadosCard__container}>
			<img src={img} alt={`${img}_img`} />
			<div className={styles.postsRelacionadosCard__data}>
				<h5>{titulo}</h5>
				<p>{title}</p>
			</div>
		</div>
	);
}
