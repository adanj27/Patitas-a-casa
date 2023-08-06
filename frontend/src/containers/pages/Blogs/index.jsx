import { useParams } from 'react-router-dom';

import { Listas, Nota, Parrafo, Portada, Posts, Subtitulos } from './components';

import styles from './styles.module.css';

import { blogData } from "../../../data/blogs";

import fb_icon from '/icons/facebook.png';
import twitter_icon from '/icons/twitter-sign.png';
import ig_icon from '/icons/instagram.png';
import yt_icon from '/icons/youtube.png';

const Blogs = ({ imgP, tituloP }) => {
	const { id } = useParams();
	const blogId = parseInt(id, 10);
	console.log(blogId)

	const blog = blogData.find(blog => blog.id === blogId);
	console.log(blog)

	return (
		<>
			<div className={styles.blogs__container}>
				<Portada
					consejos={blog.category}
					img={blog.imageBanner}
					titulo={blog.title}
				/>
				<div className={styles.blogsData__container}>
					{blog.description.map((item, index) => {
						if (item.type === 'paragraph') {
							return <Parrafo key={index} text={item.content} />;
						} else if (item.type === 'subtitle') {
							return <Subtitulos key={index} text={item.content}/>;
						} else if (item.type === 'image') {
							return <Portada img={item.url} alt="Image" key={index} />;
						}
						return null;
					})}
				</div>
				<p className={styles.blogs__refran}>LOS QUEREMOS, LOS PROTEGEMOS</p>
				<div className={styles.blogs__footer}>
					<span>{blog.date}</span>
					<div>
						<a href="#">
							<img src={fb_icon} alt='fb_icon' />
						</a>
						<a href="#">
							<img src={yt_icon} alt='yt_icon' />
						</a>
						<a href="#">
							<img src={ig_icon} alt='ig_icon' />
						</a>
						<a href="#">
							<img src={twitter_icon} alt='twitter_icon' />
						</a>
					</div>
				</div>
				<Posts posts={blog.category} />
			</div>
		</>
	);
}

export default Blogs