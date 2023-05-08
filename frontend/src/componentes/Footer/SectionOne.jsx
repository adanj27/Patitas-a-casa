import styles from '../../css/Footer/SectionOne.module.css';
import { Logo } from '../../iconos/svg/icons_svg'

export default function SectionOne({ parrafo }) {
  return (
		<section className={styles.sectionOne__footer}>
			<Logo className={styles.logo} />
			<p className={styles.p__sectionOne}>
				{ parrafo }
			</p>
		</section>
	);
}