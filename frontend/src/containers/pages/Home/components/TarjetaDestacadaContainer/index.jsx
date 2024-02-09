// Components import
import {TarjetaDestacada} from '../TarjetaDestacada'

// hook import
import { useEffect, useState } from 'react';
import useGet from '../../../../../hooks/services/useGet';
import useDataHoPet from '../../../../../hooks/useDataHoPet'

// style import
import styles from './styles.module.css';

const TarjetaDestacadaContainer = () => {
	const { data, status } = useGet("form");

	if (!data || !data.data) {
    return <p>Cargando...</p>;
  }
	
	const TranslateSize = (size) => {
		switch (size) {
			case 'SMALL':
				return 'Pequeño';
			case 'MEDIUM':
				return 'Mediano';
			case 'LARGE':
				return 'Grande';
			default:
				return size;
		}
	};

  const lostData = data.data.filter((item) => item.type_search === "LOST");
  const foundData = data.data.filter((item) => item.type_search === "FOUND");

  lostData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  foundData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Interlevar los datos de "LOST" y "FOUND"
  const interleavedData = [];
  for (let i = 0; i < Math.max(lostData.length, foundData.length); i++) {
    if (i < lostData.length) {
      interleavedData.push(lostData[i]);
    }
    if (i < foundData.length) {
      interleavedData.push(foundData[i]);
    }
  }

  const combinedData = interleavedData.slice(0, 6);

  return (
		<section className={styles.tarjetaDestacadaContainer}>
			{combinedData?.map(({ _id, name, size, loss_date, address, contact, description, image_url }) => (
				<TarjetaDestacada
					key={_id}
					nombre={name ? name : 'Encontrado'}
					image={image_url}
					length={TranslateSize(size)}
					date={loss_date ? loss_date.split('T')[0] : ''}
					place={address}
					contact={contact}
					description={description}
				/>
			))}
		</section>
	);
}

export default TarjetaDestacadaContainer
