import React from "react";
import styles from "../../css/principales/letraParrafo.module.css";

const LetraParrafo = ({ texto, clase }) =>{
  texto = texto.split('\n')

  return(
    <p className={`${styles[`letra-parrafo`]} ${styles[clase]}`}>
      {texto.map((linea, indice) => (
        <React.Fragment key={indice}>
          {linea}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export default LetraParrafo;