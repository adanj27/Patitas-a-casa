import styles from './styles.module.css';
import { blogData } from "../../../../../data/blogs";
import { Card } from "../../../Blog/components/Card";

export const Posts = ({ posts }) => {

	const filteredBlogs = blogData.filter(pro => pro.category === posts).slice(0, 3);

	const data = blogData.slice(0, 3)

  return (
		<div className={styles.postsRelacionados__container}>
			{filteredBlogs.map((blog, index) => {
				return (
					<Card
						key={index}
						id={blog.id}
						img={blog.imageBanner}
						consejo={blog.category}
						titulo={blog.title}
						descripcion={blog.description[0].content.split(" ").slice(0, 15).join(" ")}
						fecha={blog.date}
						related={true}
					/>
				)
			})}
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
