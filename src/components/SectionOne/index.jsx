import { Logo } from '../Icons';
import styles from './styles.module.css';

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
