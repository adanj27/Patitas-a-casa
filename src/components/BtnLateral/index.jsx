import styles from "./styles.module.css";

const BtnLateral = ({ src, alt }) => {
	return(
			<img 
				src={src}
				className={styles["btn-lateral"]}
				alt={alt}
			/>
	);
};

export default BtnLateral;
