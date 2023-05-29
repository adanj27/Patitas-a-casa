import { Fragment } from "react";
import styles from "./styles.module.css";

export const LetraParrafo = ({ texto, clase }) =>{
  texto = texto.split('\n')

  return(
    <p className={`${styles[`letra-parrafo`]} ${styles[clase]}`}>
      {texto.map((linea, indice) => (
        <Fragment key={indice}>
          {linea}
          <br />
        </Fragment>
      ))}
    </p>
  );
};

