import styles from './styles.module.css';
import { LetraTitulo, Paginacion } from '../../../components';
import { Card } from './components/Card';

export const Blog = () => {
	return (
		<>
			<div className={styles.blog__container}>
				<LetraTitulo
					texto="Blog"
					clase="letra-titulo--red--mobile"
				/>
				<div className={styles.blog__card}>
					<Card
						img="https://gestion.portalbiesa.com/redaccio/arxius/imatges/201809/770_1537349658blog_post_suean_1.jpg"
						consejo="Consejo"
						titulo="¿Qué sueñan las mascotas?"
						descripcion="Los investigadores han comprobado que los perros duermen muchas horas, pero no de manera continua. De hecho, lo hacen entre 5 y 20 minutos seguidos y se desvelan otros 5, repitiéndose..."
						fecha="17/06/2019 10:03"
					/>
					<Card
						img="https://gestion.portalbiesa.com/redaccio/arxius/imatges/201807/770_1532707274blog_post_perro_dice_quiero_1.jpg"
						consejo="Los queremos, los cuidamos"
						titulo="Proteger a nuestras mascotas durante la verbena de San Juan"
						descripcion="Nosotros queremos a nuestros perros y los sentimos parte de la familia. Pero, ¿qué es lo que ellos sienten hacia nosotros? Es bien conocido que, de todos los seres vivos, los perros son los más fieles..."
						fecha="17/06/2019 10:03"
					/>
					<Card
						img="https://gestion.portalbiesa.com/redaccio/arxius/imatges/201810/770_1540802074blog_post_muda_pelo_1.jpg"
						consejo="Consejo"
						titulo="Cómo afecta la muda del pelo a tu mascota"
						descripcion="Pelos por el suelo, el sofá, la alfombra,… en aquellos lugares en los que nuestra mascota se encuentre cerca, podremos encontrar la gran ‘molestia’ del pelaje ¿Cómo afecta la muda de pelo a..."
						fecha="17/06/2019 10:03"
					/>
					<Card
						img="https://gestion.portalbiesa.com/redaccio/arxius/imatges/201906/770_1560758048blog_post_porque-los-gatos-aranan_y_muerden_cosas_1.jpg"
						consejo="Consejo"
						titulo="¿Porqué los gatos arañan y muerden cosas?"
						descripcion="Si tu gato tiene la costumbre de masticar o arañar algunas prendas u objetos de tu hogar, puede ser por diferentes razones. ¿Por qué los gatos arañan las cosas? Cuando decides adoptar a un gatito..."
						fecha="17/06/2019 10:03"
					/>
					<Card
						img="https://gestion.portalbiesa.com/redaccio/arxius/imatges/201809/770_1537459816blog_post_mejoran_mundo_1.jpg"
						consejo="Consejo"
						titulo="Los perros mejoran el mundo"
						descripcion="Sí, podemos presumir que nuestro mundo es un lugar mejor gracias a nuestros peluditos. Y es que no solo nos ofrecen su compañía, sino que nos hacen ser mejores personas. Gracias a ellos, el mundo es..."
						fecha="17/06/2019 10:03"
					/>
					<Card
						img="https://img.freepik.com/foto-gratis/perro-galgo-sonriente-acostado-cama_23-2149872924.jpg?w=1380&t=st=1678762606~exp=1678763206~hmac=f02df869f410d6191a0feb0a5864ff19899144ba01bd3628ab031d80b1ee63a7"
						consejo="Consejo"
						titulo="¿Por qué no deberías subir a tu perro a la cama?"
						descripcion="Los perros son mascotas adorables y leales, y muchos dueños los consideran como miembros de la familia. Es común que los dueños permitan que sus perros suban a la cama y duerman junto a ellos..."
						fecha="14/03/2023 10:03"
					/>
					<Card
						img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
						consejo="Consejo"
						titulo="Proteger a nuestras mascotas durante la verbena de San Juan"
						descripcion="Nosotros queremos a nuestros perros y los sentimos parte de la familia. Pero, ¿qué es lo que ellos sienten hacia nosotros? Es bien conocido que, de todos los seres vivos, los perros son los más fieles..."
						fecha="17/06/2019 10:03"
					/>
					<Card
						id={2}
						img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
						consejo="Consejo"
						titulo="Cómo afecta la muda del pelo a tu mascota"
						descripcion="Pelos por el suelo, el sofá, la alfombra,… en aquellos lugares en los que nuestra mascota se encuentre cerca, podremos encontrar la gran ‘molestia’ del pelaje ¿Cómo afecta la muda de pelo a..."
						fecha="17/06/2019 10:03"
					/>
					<Card
					id={3}
						img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
						consejo="Consejo"
						titulo="¿Porqué los gatos arañan y muerden cosas?"
						descripcion="Si tu gato tiene la costumbre de masticar o arañar algunas prendas u objetos de tu hogar, puede ser por diferentes razones. ¿Por qué los gatos arañan las cosas? Cuando decides adoptar a un gatito..."
						fecha="17/06/2019 10:03"
					/>
					<Card
						img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
						consejo="Consejo"
						titulo="Los perros mejoran el mundo"
						descripcion="Sí, podemos presumir que nuestro mundo es un lugar mejor gracias a nuestros peluditos. Y es que no solo nos ofrecen su compañía, sino que nos hacen ser mejores personas. Gracias a ellos, el mundo es..."
						fecha="17/06/2019 10:03"
					/>
					<Card
						img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
						consejo="Consejo"
						titulo="¿Por qué no deberías subir a tu perro a la cama?"
						descripcion="Los perros son mascotas adorables y leales, y muchos dueños los consideran como miembros de la familia. Es común que los dueños permitan que sus perros suban a la cama y duerman junto a ellos..."
						fecha="14/03/2023 10:03"
					/>
					<Card
					id={7}
						img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
						consejo="Consejo"
						titulo="¿Por qué es importante socializar a tu cachorro?"
						descripcion="La socialización es un proceso crucial para los cachorros, y se refiere a la exposición temprana y constante a diferentes estímulos, ambientes y personas..."
						fecha="17/06/2019 10:03"
					/>
					<Card
					id={8}
						img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
						consejo="Consejo"
						titulo="¿Por qué no deberías dejar comida para gatos en el exterior?"
						descripcion="Los gatos son animales independientes que a menudo disfrutan de la vida al aire libre. Aunque es común dejar comida para gatos en el exterior, hay varias razones por las que no deberías hacerlo."
						fecha="17/06/2019 10:03"
					/>
					<Card
					id={9}
						img="https://nfnatcane.es/blog/wp-content/uploads/2022/10/historia-de-la-raza-chihuahua.jpg"
						consejo="Consejo"
						titulo="¿Por qué no deberías dejar a tus hijos solos con mascotas desconocidas?"
						descripcion="Las mascotas pueden ser una gran fuente de alegría y compañía para los niños, pero es importante tener precaución cuando se trata de mascotas desconocidas."
						fecha="17/06/2019 10:03"
					/>
				</div>
				<Paginacion enlaces={['', '', '', '', '']} />
			</div>
		</>
	);
};

