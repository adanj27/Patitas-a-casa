import styles from './styles.module.css';

export default function Copyright ({ year }) {
  return (
		<div className={styles.copyright}>
			<p className={styles.copyright__p}>
				Terminos y Condiciones | Copyright © {year} PATITAS A CASA
			</p>
		</div>
	);
}
