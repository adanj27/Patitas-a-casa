import { useState } from 'react';

import { BtnPrincipal } from '../../../components';
import { Notification } from '../../../components/Notification/Index';
import styles from './styles.module.css';

import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_ID = import.meta.env.VITE_EMAILJS_PUBLIC_ID;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const Contacto = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\d{10}$/;

  const [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [email, setEmail] = useState(''),
    [phone, setPhone] = useState(''),
    [message, setMessage] = useState(''),
    [showNotification, setShowNotification] = useState(false),
    [notification, setNotification] = useState('');

  const handleChangeInput = (event, setFunction) => {
    event.target.value.length > 0
      ? (event.target.style.borderBottom = '1px solid #ff0004b2')
      : (event.target.style.borderBottom = '1px solid #575756');
    setFunction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let check = true;
    let failedProp = '';
    let inputError = '';

    const maxMinLength = (field, min, max) => {
      if (field.length < min)
        return [false, `no tiene la longitud mínima de ${min}`];
      if (field.length > max)
        return [false, `es demasiado largo, máximo ${max}} carácteres`];
      return [true, ''];
    };

    const matchPattern = (field, pattern) => {
      if (!field.match(pattern)) return [false, `no es válido`];
      return [true, ''];
    };

    const refactor = {
      Nombre: maxMinLength(firstName, 2, 30),
      Apellido: maxMinLength(lastName, 2, 30),
      Email: matchPattern(email, emailPattern),
      Teléfono: matchPattern(phone, phonePattern),
      Mensaje: maxMinLength(message, 5, 300),
    };
    for (const prop in refactor) {
      const [status, error] = refactor[prop];
      if (!status) {
        check = false;
        failedProp = prop;
        inputError = error;
        break;
      }
    }
    setShowNotification(true);
    if (check) {
      const emailParams = {
        to_name: 'abdn270594@gmail.com', // Puedes personalizar el destinatario
        from_name: `${firstName} ${lastName}`,
        from_email: email,
        phone_number: phone,
        message: message,
      };

      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          emailParams,
          EMAILJS_PUBLIC_ID
        )
        .then(
          (response) => {
            console.log('Correo enviado con éxito', response);
            setShowNotification(true);
            setNotification('Correo enviado con éxito');

            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setMessage('');
          },
          (error) => {
            console.error('Error al enviar el correo', error);
            setShowNotification(true);
            setNotification('Error al enviar el correo');
          }
        );
    } else {
      setShowNotification(true);
      setNotification(`El campo ${failedProp} ${inputError}`);
    }
  };

  const textareaStyle = {
    height: message === '' ? 'auto' : '3.5rem', // Cambia la altura según el contenido
  };

  return (
    <>
      {showNotification && (
        <Notification
          setShowModal={setShowNotification}
          message={notification}
        />
      )}
      <div className={styles['contenedor-principal']}>
        <form onSubmit={handleSubmit} action="/" className={styles.contacto}>
          <div className={styles['contacto__information']}>
            <header>
              <h2>Contacta con el equipo de “Patitas a Casa”</h2>
              <h5>
                Una gran visión sin grandes personas es irrelevante. Trabajemos
                juntos.
              </h5>
            </header>
            <article>
              <p>
                Si deseas colaborar con nosotros y consideras que tienes
                habilidades que podrían aportar al equipo, por favor completa
                este formulario y te responderemos a la brevedad.
                <span>
                  <br />
                  <br />
                </span>
                Si cuentas con un refugio que quisieras agregar a nuestro
                listado, envíanos un correo con los datos del mismo y nos
                pondremos en contacto contigo.
              </p>
            </article>
          </div>
          <div className={styles['contacto__container']}>
            <div className={styles.contacto__inputs}>
              <div>
                <label
                  style={
                    firstName.length > 0
                      ? { color: '#ff0004b2' }
                      : { color: '#575756' }
                  }
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  name="nombre"
                  type="text"
                  value={firstName}
                  className={styles.contacto__input}
                  id="nombre"
                  onChange={(event) => {
                    handleChangeInput(event, setFirstName);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={
                    lastName.length > 0
                      ? { color: '#ff0004b2' }
                      : { color: '#575756' }
                  }
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  name="apellido"
                  type="text"
                  id="apellido"
                  value={lastName}
                  onChange={(event) => {
                    handleChangeInput(event, setLastName);
                  }}
                  className={styles.contacto__input}
                  required
                />
              </div>
              <div>
                <label
                  style={
                    email.length > 0
                      ? { color: '#ff0004b2' }
                      : { color: '#575756' }
                  }
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  className={styles.contacto__input}
                  id="email"
                  value={email}
                  onChange={(event) => {
                    handleChangeInput(event, setEmail);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={
                    phone.length > 0
                      ? { color: '#ff0004b2' }
                      : { color: '#575756' }
                  }
                  htmlFor="telefono"
                >
                  Teléfono
                </label>
                <input
                  name="telefono"
                  type="number"
                  className={styles.contacto__input}
                  id="telefono"
                  value={phone}
                  onChange={(event) => {
                    handleChangeInput(event, setPhone);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={
                    message.length > 0
                      ? { color: '#ff0004b2' }
                      : { color: '#575756' }
                  }
                  htmlFor="mensaje"
                >
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  type="text"
                  className={styles.contacto__textarea}
                  required
                  value={message}
                  onChange={(event) => {
                    handleChangeInput(event, setMessage);
                  }}
                  id="mensaje"
                  maxLength="300"
                  style={textareaStyle}
                />
              </div>
            </div>
            <div className={styles['contact__send']}>
              <BtnPrincipal texto="Enviar" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contacto;
