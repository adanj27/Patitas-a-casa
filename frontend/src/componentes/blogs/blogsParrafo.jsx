import styles from '../../css/blogs/blogsParrafo.module.css';

export default function BlogsParrafo({ text }) {
	return <p className={styles.blogsParrafo}>{text}</p>;
}
