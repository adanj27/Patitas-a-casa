import React from "react";
import styles from "../../css/nav/btnLateral.module.css";

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