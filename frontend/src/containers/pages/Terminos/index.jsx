import styles from './styles.module.css';

const Terminos = () => {
  return (
    <div className={styles["terms-and-conditions"]}>
      <h1 className={styles["terms-and-conditions__title"]}>
        Términos y Condiciones de Uso de Patitas a Casa
      </h1>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          1. Aceptación de los Términos y Condiciones
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          Al acceder y utilizar la plataforma web "Patitas a Casa" (en adelante,
          el "Sitio"), usted acepta estar sujeto a los siguientes Términos y
          Condiciones de Uso. Si no está de acuerdo con alguno de los términos,
          le solicitamos que no utilice el Sitio.
        </p>
      </section>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          2. Uso del Sitio
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          El Sitio "Patitas a Casa" tiene como objetivo principal proporcionar a
          los usuarios una herramienta para reportar mascotas perdidas o
          encontradas. Al utilizar el Sitio, el usuario se compromete a
          proporcionar información precisa y veraz.
        </p>
      </section>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          3. Registro y Cuenta del Usuario
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          Para utilizar ciertas funciones del Sitio, puede ser necesario
          registrarse y crear una cuenta de usuario. Usted es responsable de
          mantener la confidencialidad de su información de inicio de sesión y
          es completamente responsable de todas las actividades que ocurran bajo
          su cuenta.
        </p>
      </section>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          4. Información del Usuario y Privacidad
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          Al utilizar el Sitio, usted acepta nuestra Política de Privacidad, que
          describe cómo recopilamos, utilizamos y compartimos su información. Le
          recomendamos revisar nuestra Política de Privacidad disponible en el
          Sitio.
        </p>
      </section>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          5. Contenido del Usuario
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          Los usuarios son responsables del contenido que publiquen en el Sitio,
          incluidos los reportes de mascotas perdidas o encontradas. No se
          permite contenido ofensivo, difamatorio, ilegal o que viole los
          derechos de terceros. "Patitas a Casa" se reserva el derecho de
          eliminar cualquier contenido que viole estos términos.
        </p>
      </section>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          6. Propiedad Intelectual
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          El contenido y los materiales presentes en el Sitio, incluyendo pero
          no limitándose a texto, gráficos, logotipos, imágenes y software,
          están protegidos por derechos de autor y otras leyes de propiedad
          intelectual.
        </p>
      </section>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          7. Limitación de Responsabilidad
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          "Patitas a Casa" no se hace responsable de la veracidad de la
          información proporcionada por los usuarios ni de las acciones
          derivadas de dicha información. El Sitio se ofrece "tal cual" y no
          garantiza la disponibilidad continua o la ausencia de errores.
        </p>
      </section>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          8. Modificaciones de los Términos y Condiciones
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          Nos reservamos el derecho de modificar estos Términos y Condiciones en
          cualquier momento. Las modificaciones entrarán en vigor inmediatamente
          después de su publicación en el Sitio. Se recomienda revisar
          regularmente los Términos y Condiciones para estar informado de
          cualquier cambio.
        </p>
      </section>

      <section className={styles["terms-and-conditions__section"]}>
        <h2 className={styles["terms-and-conditions__section-title"]}>
          9. Ley Aplicable y Jurisdicción
        </h2>
        <p className={styles["terms-and-conditions__text"]}>
          Estos Términos y Condiciones se regirán e interpretarán de acuerdo con
          las leyes del lugar de residencia del usuario. Cualquier disputa
          relacionada con estos términos estará sujeta a la jurisdicción de los
          tribunales competentes en ese lugar.
        </p>
      </section>

      <p className={styles["terms-and-conditions__final-text"]}>
        Al utilizar "Patitas a Casa", usted acepta cumplir con estos Términos y
        Condiciones. Si tiene alguna pregunta o inquietud, por favor contáctenos
        a través de los canales proporcionados en el Sitio.
      </p>
    </div>
  );
};

export default Terminos;
