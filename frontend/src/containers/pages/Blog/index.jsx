import styles from './styles.module.css';
import { LetraTitulo, Paginacion } from '../../../components';
import { Card } from './components/Card';
import { useState } from "react";
import { blogData } from "../../../data/blog-data";

export const Blog = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(8)

	const lastPostIndex = currentPage * postsPerPage
	const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = blogData.slice(firstPostIndex, lastPostIndex)
  const totalPosts = blogData.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

	return (
		<>
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
								img={blog.img}
								consejo={blog.consejo}
								titulo={blog.titulo}
								descripcion={blog.descripcion}
								fecha={blog.fecha}
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

