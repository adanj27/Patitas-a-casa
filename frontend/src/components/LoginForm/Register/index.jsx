import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.css';
import close from '/icons/imagenes recursos/close.png';
import loginForm from '/icons/imagenes recursos/loginForm.png';

export const RegisterForm = ({ setLogin, isRegisterForm, switchForm }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Correo es requerido';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Contraseña es requerida';
    }
    setErrors(newErrors);

    // Si no hay errores, puedes manejar los datos (por ahora solo log)
    if (Object.keys(newErrors).length === 0) {
      console.log('Datos del formulario:', formData);
      // Puedes redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div className={styles.imgContainer}>
          <img src={loginForm} alt="login-form" className={styles.imgContainerBg} />
          <button className={styles.cancelButton} onClick={handleCancel}>
            <img src={close} alt="close-icon" className={styles.cancelButtonImg} />
          </button>
        </div>
        <span className={styles.formTitle}>Registrarte</span>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
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
            {isRegisterForm ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
            <span onClick={switchForm}>
              {isRegisterForm ? 'Iniciar sesión' : 'Registrarte'}
            </span>
          </p>
          <div className={styles.submitButton}>
            <button type="submit" className={styles.button}>
              {isRegisterForm ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
