import styles from "./styles.module.css";

import { Data } from "../../../data/HO-PET";
import { AdoptarTarjeta, Filtrar, LetraParrafo, LetraSubtitulo, LetraTitulo, Paginacion } from "../../../components";
import { useState } from "react";

const Adoptar = () => {
  const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(6)

	const lastPostIndex = currentPage * postsPerPage
	const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = Data.slice(firstPostIndex, lastPostIndex)
  const totalPosts = Data.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <>
      <div className={styles.adoptar__container}>
        <section className={styles["texto-container"]}>
          <article className={styles["texto-container__titulo"]}>
            <LetraTitulo
              texto="Mascotas en Adopción"
              clase="letra-titulo--red"
            />
            <LetraSubtitulo
              texto="Encuentra a tu nuevo mejor amigo"
              clase="letra-titulo--red"
            />
          </article>
          <article className={styles["texto-container__subtitulo"]}>
            <LetraParrafo
              texto="“Encuentra tu compañero fiel en nuestra lista de mascotas en adopción. Adopta hoy y haz feliz a una mascota.”"
              clase="letra-parrafo--black"
            />
          </article>
          <article className={styles.adoptarTarjeta__container}>
            {currentPosts.map(({ id, nombre, imagen, descripcion, contacto, edad, refugio }, index) => {
              return (
                <AdoptarTarjeta
                  key={id}
                  idNumber={index}
                  nombre={nombre}
                  img={imagen}
                  descripcion={descripcion}
                  contacto={contacto}
                  edad={edad}
                  refugio={refugio}
                />
              );
            })}
          </article>
          <Paginacion
            totalPosts={Data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </section>
      </div>
    </>
  );
};

export default Adoptar

