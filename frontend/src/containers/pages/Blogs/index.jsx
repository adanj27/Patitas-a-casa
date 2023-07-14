import { useParams } from 'react-router-dom';

import { Listas, Nota, Parrafo, Portada, Posts, Subtitulos } from './components';

import styles from './styles.module.css';

import fb_icon from '/icons/facebook.png';
import twitter_icon from '/icons/twitter-sign.png';
import ig_icon from '/icons/instagram.png';
import yt_icon from '/icons/youtube.png';

export const Blogs = ({ imgP, tituloP }) => {
	const { id } = useParams();

	return (
		<>
			<div className={styles.blogs__container}>
				<Portada
					consejos={true}
					img={
						imgP
							? imgP
							: 'https://frenchiemania.com/wp-content/uploads/2014/08/caracteristicas-bulldog-frances-perro-pequeno.jpg'
					}
					titulo="PROTEGER A NUESTRAS MASCOTAS DURANTE LA VERBERNA DE SAN JUAN"
				/>
				<div className={styles.blogsData__container}>
					<Parrafo text="¡Siiuumm!, … ¡PIM, PAM, PUM!, … ¡fiiuusss! La noche del 23 de junio queremos darle la bienvenida al solsticio de verano haciendo que la víspera de San Juan sea una noche mágica donde el fuego, el agua, el ruido y las hogueras nos preserven de todo mal durante un año. Celebramos una verbena donde todo el mundo se reúne para pasarla en grupo, hablar, cantar, bailar, lanzar petardos y reír. Diversión hasta la madrugada que no comparte nuestra mascota: San Juan, verbena, petardos, terror. La verbena de San Juan es de todo menos un día de celebración para nuestra mascota. La mayoría de los perros y gatos temen a los petardos y los fuegos artificiales." />
					<Subtitulos text="¿Por qué se asustan?" />
					<Parrafo text="La sensibilidad de su oído es extrema, supera los 20 KHz (máximo audible para el humano) pudiendo alcanzar los 60 KHz. Cuando suena un petardo, el perro o el gato se altera produciéndose una descarga hormonal que le prepara para la acción. Antes de que el animal haya tenido tiempo de reponerse y disminuir su estrés, se oye un segundo petardo. El animal reacciona con mayor intensidad porque su cuerpo ya se encuentra activado, elevando aún más el nivel de estrés. Y así sucesivamente, sin opción de solución hasta que cesan los petardos." />
					<Nota text="La sensibilidad de nuestro oído es extrema, pudiendo alcanzar los 60 KHz. ¡El máximo audible para las personas es de 20KHz!" />
					<Subtitulos text="¿Qué podemos hacer?" />
					<Parrafo
						text="Nuestra recomendación es prever la situación y visitar a nuestro veterinario a tiempo. Si somos conscientes de que vivimos en una comunidad donde la celebración de la verbena es inevitable, debemos, con suficiente antelación, concertar una visita con nuestro veterinario. Es quien nos ayudará a encontrar la mejor manera de abordar este problema para el bien de nuestra mascota.
						Hay terapias de desensibilización que pueden llegar a preparar a nuestras mascotas frente a los petardos, que hagan que no los vean como una amenaza y que aprendan a no sobre reaccionar frente a ellos. Aunque, como cualquier alteración del comportamiento, el camino no es fácil, y requerirá de mucha paciencia y comprensión por parte de toda la familia ☺.
						Igualmente existen medicamentos, que según la prescripción de nuestro veterinario, podrán ayudar a preparar a nuestra mascota desde unos días antes de la verbena y durante la misma. Recuerda, nuestro veterinario será la única persona capacitada para prescribirnos tanto una pauta a seguir como la medicación que mejor pueda funcionar con nuestras mascotas. Y sobre todo, ¡mucha paciencia y comprensión!"
					/>
					<Portada img="https://s3-alpha-sig.figma.com/img/2b19/80fe/1d8476c061d9b0fea0ce028f8560423d?Expires=1678665600&Signature=PUHGYz-A299GW7bV1e5mdeKtfKDDPpbJQXQc0Fkwvq06tkexV78QgLGrJ7gBLCtOJiN1Mg5Vh7os0Ytdu9N4ZUqas0FT3DX~TL0TVVlrBKEbtYcjB3Z26UHIcpXVcmAgIrVERs44EWmDTSZRBYxbvj~Xq1pRqZxwBthWVwYE05VA4eDyWwqajmQHajljcG46gLVNtE8M9UThUPDHuH-XoNjCZ2m-rR-hQn9N9zb~PqrdyHK1q-Ma29PsY2Vem4KzoOrH5jgtbmwoL~OaDQk4ojBBzgn48~L~ovq6BEK9~qwyPK2EGOhqkNiePyGIwsD6aW3iusU1vfwzxO6Z5T4yeg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
					<BlogsParrafo text="Y durante la celebración de la verbena… lo único que está en nuestras manos es intentar minimizar el impacto del pánico que sentirá nuestra mascota y hacer que sea lo más llevadero posible para ella. Durante los días previos a la verbena, será recomendable sacar a pasear la mascota durante más tiempo con el propósito de que se explaye y que disfrute, en previsión de una o varias jornadas de más reclusión de la habitual." />
					<Listas
						titulo="Lo que sí podemos hacer durante la celebración será:"
						contenido={[
							'Cerrar ventanas y bajar persianas para limitar el ruido de la pirotecnia, pero también para evitar los accidentes derivados de una huida descontrolada.',
							'Poner música suave o la televisión para mitigar los ruidos del exterior.',
							'Dejar que el animal se esconda libremente; seguramente buscará un lugar oscuro y pequeño. Podemos preparar una habitación con sus juguetes preferidos.',
							'Ofrecerle nuestra compañía, si es lo que prefiere para sentirse más protegido.',
							'Mantener la calma. Actuar con naturalidad, darle cariño, y prestarle atención cuando esté calmado.',
							'En caso de que nuestro veterinario nos haya recomendado alguna medicación, suministrársela si consideramos que es necesaria.',
						]}
					/>
					<Listas
						titulo="Lo que no deberemos hacer durante la celebración será:"
						contenido={[
							'No dejarlo solo, podría lesionarse o escaparse. Pero no exagerar el contacto más allá de lo necesario.',
							'No llevarlo suelto, podría asustarse y huir.',
							'No hacer salidas largas y lejos de casa.',
						]}
					/>
					<Parrafo text="Recuerda que este miedo a los petardos y fuegos artificiales requiere tanto de una solución puntual para momentos concretos como la verbena de San Juan, como medidas a largo plazo que incluyen terapias de modificación de conducta. Consulta a tu veterinario, es quien nos puede ayudar a dar con el mejor método para evitar que nuestras mascotas sufran durante la verbena y no lo olvides… PORQUE LOS QUEREMOS, LOS PROTEGEMOS." />
					<p className={styles.blogs__refran}>LOS QUEREMOS, LOS PROTEGEMOS</p>
					<div className={styles.blogs__footer}>
						<span>17/06/2019 10:03</span>
						<div>
							<img src={fb_icon} alt='fb_icon' />
							<img src={yt_icon} alt='yt_icon' />
							<img src={ig_icon} alt='ig_icon' />
							<img src={twitter_icon} alt='twitter_icon' />
						</div>
					</div>
					<Posts />
				</div>
			</div>
		</>
	);
}
