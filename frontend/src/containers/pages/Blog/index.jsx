import styles from './styles.module.css';
import { LetraTitulo, Paginacion } from '../../../components';
import { Card } from './components/Card';
import { useState } from "react";
import { blogData } from "../../../data/blogs";

const Blog = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(8)

	const lastPostIndex = currentPage * postsPerPage
	const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = blogData.slice(firstPostIndex, lastPostIndex)
  const totalPosts = blogData.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

	return (
		<>
			<div className={styles.blog__header}>
				<h1>BLOG DE PATITAS A CASA</h1>
				<p>Este blog esta hecho para informar y ayudar a nuestros visitantes sobre el cuidado y curiosidades</p>
				<p>Si quieres sumar un blog propio solo ponte en contacto con nosotros</p>
			</div>
			<div className={styles.blog__container}>
				<LetraTitulo
					texto="Blog"
					clase="letra-titulo--red--mobile"
				/>
				<div className={styles.blog__card}>
					{currentPosts.map((blog, index) => {
						return (
							<Card 
								key={index}
								id={blog.id}
								img={blog.imageBanner}
								consejo={blog.category}
								titulo={blog.title}
								descripcion={blog.description[0].content.split(" ").slice(0, 15).join(" ")}
								fecha={blog.date}
							/>
						)
					})}
				</div>
				<Paginacion
					totalPosts={blogData.length}
					postsPerPage={postsPerPage}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					totalPages={totalPages}
				/>
			</div>
		</>
	);
};

export default Blog