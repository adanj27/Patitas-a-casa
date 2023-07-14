// Components import
import {TarjetaDestacada} from '../TarjetaDestacada'

// hook import
import useDataHoPet from '../../../../../hooks/useDataHoPet'

// style import
import styles from './styles.module.css';

const TarjetaDestacadaContainer = () => {
  const length = useDataHoPet().length
  const Data = useDataHoPet().slice(length - 6, length)
  return (
		<section className={styles.tarjetaDestacadaContainer}>
			{Data.map((pet) => (
				<TarjetaDestacada
					key={pet.id}
					nombre={pet.nombre}
					image={pet.imagen}
					length={pet.tamaño}
					date={pet.fecha}
					place={pet.lugar}
					contact={pet.contacto}
					description={pet.descripcion}
				/>
			))}
		</section>
	);
}

export default TarjetaDestacadaContainer
