import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.css';
import close from '/icons/imagenes recursos/close.png';
import form from '/icons/forms_svg.svg';
import logoWhite from '/icons/pac-logo.png';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { SpinnerButton } from '../../SpinnerButton/index';
import { toast } from 'sonner';

export const RegisterForm = ({ setLogin, isRegisterForm, switchForm }) => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    alias: '',
    phone: '',
    email: '',
    password: '',
  });
  const { login } = useAuth();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const handleCancel = () => {
    setLogin(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Aquí puedes agregar validaciones adicionales si es necesario
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Enviar la solicitud al endpoint de registro
    try {
      const response = await axios.post('/v1/auth/register', formData);

      // Puedes manejar la respuesta del servidor aquí según tus necesidades
      if (response) {
        toast.success('Registro exitoso', {
          duration: 10000,
        });
        setIsLoading(false);
        await login({ email: formData.email, password: formData.password });
        // setLogin(false);
      } else {
        const data = await response.json();
        setErrors({ serverError: data.message });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      const message = error.message;
      toast.error(message);
    }
  };

  const validateFormData = () => {
    // Aquí puedes realizar validaciones personalizadas
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = 'Campo obligatorio';
    }

    // Agrega más validaciones según tus necesidades

    return errors;
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div className={styles.imgContainer}>
        <div className={styles.bgForm}>
            <img src={form} alt="login-form" className={styles.imgForm} />
            <img
              src={logoWhite}
              alt="login-form"
              className={styles.imgContainerBg}
            />
          </div>
          <button className={styles.cancelButton} onClick={handleCancel}>
            <img
              src={close}
              alt="close-icon"
              className={styles.cancelButtonImg}
            />
          </button>
        </div>
        <span className={styles.formTitle}>Registrarte</span>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.names}>
            <div className={styles.field}>
              <label htmlFor="first_name" className={styles.label}>
                Nombre:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.first_name && (
                <p className={styles.error}>{errors.first_name}</p>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="last_name" className={styles.label}>
                Apellido:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.last_name && (
                <p className={styles.error}>{errors.last_name}</p>
              )}
            </div>
          </div>
          <div className={styles.names}>
            <div className={styles.field}>
              <label htmlFor="alias" className={styles.label}>
                Nombre de usuario:
              </label>
              <input
                type="text"
                id="alias"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.alias && <p className={styles.error}>{errors.alias}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Teléfono:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Correo:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <p className={styles.link}>
            {isRegisterForm
              ? '¿No tienes una cuenta?'
              : '¿Ya tienes una cuenta?'}
            <span onClick={switchForm}>
              {isRegisterForm ? 'Registrarte' : 'Iniciar sesión'}
            </span>
          </p>
          <div className={styles.submitButton}>
            <button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? <SpinnerButton /> : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
