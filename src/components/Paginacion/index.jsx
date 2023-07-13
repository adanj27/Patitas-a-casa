import icon from '/icons/arrow-down-sign-to-navigate.png';
import styles from './styles.module.css';

// Iconos
import arrowLeft from "/icons/arrow-left-black.svg";
import arrowRight from "/icons/arrow-right-black.svg";

export const Paginacion = ({ totalPosts, postsPerPage, setCurrentPage, currentPage, totalPages }) => {
	let pages = []

	for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
		pages.push(i)
	}

	const arrowPrev = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}

	}
	const arrowNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
		else {
			setCurrentPage(totalPages)
		}
	}

  return (
		<div className={styles.paginacion}>
			<div className={styles.paginacion__container}>
				<img
					className={styles.paginacion__img}
					src={arrowLeft}
					alt={`arrow-img`}
					onClick={() => arrowPrev()}
				/>
				{
					pages.map((page, index) => {
						return (
							<button
								className={`${styles.paginacion__button} ${currentPage === index + 1 ? styles["paginacion__button--active"] : ""}`}
								key={index}
								onClick={() => setCurrentPage(page)}
							>
								{page}
							</button>
						);
					})
				}
				<img
					className={styles.paginacion__img}
					src={arrowRight}
					alt={`arrow-img`}
					onClick={() => arrowNext()}
				/>
			</div>
		</div>
	);
}
