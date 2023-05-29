import styles from './styles.module.css';
import fb_icon from '/icons/facebook.png';
import twitter_icon from '/icons/twitter-sign.png';
import ig_icon from '/icons/instagram.png';
import yt_icon from '/icons/youtube.png';

export default function SectionThree () {
  return (
		<section className={styles.sectionThree}>
			<h3 className={styles.sectionThree__h3}>Suscríbete al boletin</h3>
			<form className={styles.sectionThree__form} action="#" method="post">
				<input type="email" placeholder="Email" />
				<input type="submit" value="✉️" />
			</form>
			<div className={styles.sectionThree__redes}>
				<a href="/">
					<img src={fb_icon} alt="fb-logo" />
				</a>
				<a href="/">
					<img src={twitter_icon} alt="twitter-logo" />
				</a>
				<a href="https://www.instagram.com/patitasacasa_arg/" target="_blank" rel="noopener noreferrer">
					<img src={ig_icon} alt="ig-logo" />
				</a>
				<a href="/">
					<img src={yt_icon} alt="yt-logo" />
				</a>
			</div>
		</section>
	);
}
