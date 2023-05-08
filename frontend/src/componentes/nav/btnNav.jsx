import React from "react";
import styles from "../../css/nav/btnNav.module.css";

const BtnNav = ({ clase, texto, onClick }) => {
	return(
    <button 
			className={`${styles.btn} ${styles[clase]}`}
			onClick={onClick}
			type="button"
		>
			{texto}
		</button>
	);
};

export default BtnNav;