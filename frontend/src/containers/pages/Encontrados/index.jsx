import { Data } from '../../../data/HO-PET';
import {
  LetraParrafo,
  LetraSubtitulo,
  LetraTitulo,
  Paginacion,
  PerdidosTarjeta,
} from '../../../components';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import useGet from '../../../hooks/services/useGet';

const Encontrados = () => {
  const { data, status } = useGet('form');
  const [foundPets, setFoundPets] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = foundPets.slice(firstPostIndex, lastPostIndex);
  const totalPosts = foundPets.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const TranslateSize = (size) => {
    switch (size) {
      case 'SMALL':
        return 'Pequeño';
      case 'MEDIUM':
        return 'Mediano';
      case 'LARGE':
        return 'Grande';
      // Puedes agregar más casos según tus necesidades
      default:
        return size; // Mantén el valor original si no coincide con los casos anteriores
    }
  };

  useEffect(() => {
    if (data) {
      // Filtrar los elementos con type_search igual a "FOUND"
      const filteredFoundPets = data.data.filter(
        (item) => item.type_search === 'FOUND'
      );
      // Actualizar el estado solo si los datos filtrados son diferentes a lostPets
      if (!areArraysEqual(filteredFoundPets, foundPets)) {
        setFoundPets(filteredFoundPets);
      }
    }
  }, [data, foundPets]);

  // Función para comparar dos arrays
  function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  return (
    <>
      <div className={styles.perdidos}>
        <section className={styles['texto-container']}>
          <article className={styles['texto-container__titulo']}>
            <LetraTitulo
              texto="Mascotas Encontradas"
              clase="letra-titulo--red"
            />
            <LetraSubtitulo
              texto="Devuelve a tu amigo peludo a casa"
              clase="letra-titulo--red"
            />
          </article>
          <article className={styles['texto-container__subtitulo']}>
            <LetraParrafo
              texto="“Mascotas encontradas en busca de su dueño. Contacta al número en el afiche para reunirlas.”"
              clase="letra-parrafo--black"
            />
          </article>
        </section>
        <section className={styles.perdidos__tarjeta_container}>
          {currentPosts.map(
            ({
              _id,
              size,
              loss_date,
              address,
              contact,
              description,
              image_url,
            }) => {
              return (
                <PerdidosTarjeta
                  key={_id}
                  url_img={image_url}
                  contacto={contact}
                  desc={description}
                  fecha={loss_date ? loss_date.split('T')[0] : ''}
                  tam={TranslateSize(size)}
                  zona={address}
                  encontrado={true}
                />
              );
            }
          )}
        </section>
        <Paginacion
          totalPosts={foundPets.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default Encontrados;
