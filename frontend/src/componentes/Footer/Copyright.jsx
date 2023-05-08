import styles from '../../css/Footer/Copyright.module.css';

export default function Copyright ({ year }) {
  return (
		<div className={styles.copyright}>
			<p className={styles.copyright__p}>
				Terminos y Condiciones | Copyright © {year} PATITAS A CASA
			</p>
		</div>
	);
}