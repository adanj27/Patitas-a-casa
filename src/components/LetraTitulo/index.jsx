import styles from './styles.module.css'

export const LetraTitulo = ({ texto, align, clase }) => {
	return(
    <b><p className={`${styles[`letra-titulo`]} ${styles[clase]}`} style={{textAlign: align}}>{texto}</p></b>
	);
};

export const LetraSubtitulo = ({texto, align, clase}) => {
	return(
		<p className={`${styles[`letra-titulo`]} ${styles[clase]}`} style={{textAlign: align}}>{texto}</p>
	);
}

