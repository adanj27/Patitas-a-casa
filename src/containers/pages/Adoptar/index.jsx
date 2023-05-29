import styles from "./styles.module.css";

import { Data } from "../../../data/HO-PET";
import { AdoptarTarjeta, Filtrar, LetraParrafo, LetraSubtitulo, LetraTitulo, Paginacion } from "../../../components";

export const Adoptar = () => {
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
          <article className={styles.filter__container}>
            <Filtrar />
          </article>
          <article className={styles.adoptarTarjeta__container}>
            {Data.map(({ id, nombre, imagen, descripcion, contacto }, index) => {
              return (
                <AdoptarTarjeta
                  key={id}
                  idNumber={index}
                  nombre={nombre}
                  img={imagen}
                  descripcion={descripcion}
                  contacto={contacto}
                />
              );
            })}
          </article>
          <Paginacion enlaces={["", "", "", "", ""]} />
        </section>
      </div>
    </>
  );
};

