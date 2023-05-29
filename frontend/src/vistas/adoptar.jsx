// Librerias externas
import React from "react";

// Components
import Paginacion from "../componentes/Perdidos/paginacion";
import AdoptarTarjeta from "../componentes/adoptar/adoptarTarjeta";
import Filtrar from "../componentes/adoptar/filtrar.module";
import LetraTitulo from "../componentes/principales/LetraTitulo";
import { LetraSubtitulo } from "../componentes/principales/LetraTitulo";
import LetraParrafo from "../componentes/principales/letraParrafo";

// Estilos
import styles from "../css/adoptar/adoptar.module.css";
import styles_perdidos from "../css/Perdidos/perdidos.module.css";

// Test
import { Data } from "../Data_HO-PET";

const adoptar = () => {
  return (
    <>
      <div className={styles.adoptar__container}>
        <section className={styles_perdidos["texto-container"]}>
          <article className={styles_perdidos["texto-container__titulo"]}>
            <LetraTitulo
              texto="Mascotas en Adopción"
              clase="letra-titulo--red"
            />
            <LetraSubtitulo
              texto="Encuentra a tu nuevo mejor amigo"
              clase="letra-titulo--red"
            />
          </article>
          <article className={styles_perdidos["texto-container__subtitulo"]}>
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

export default adoptar;
