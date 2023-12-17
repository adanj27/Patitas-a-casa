import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.css';
import close from '/icons/imagenes recursos/close.png';
import loginForm from '/icons/imagenes recursos/loginForm.png';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export const RegisterForm = ({ setLogin, isRegisterForm, switchForm }) => {
  // const { setIsAuthenticated } = useAuth();
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    alias: '',
    phone: '',
    email: '',
    password: '',
  });

  console.log(formData)

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes agregar validaciones adicionales si es necesario
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Enviar la solicitud al endpoint de registro
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Puedes manejar la respuesta del servidor aquí según tus necesidades
      if (response.ok) {
        // Registro exitoso, puedes redirigir al usuario o realizar otras acciones
      } else {
        const data = await response.json();
        setErrors({ serverError: data.message });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
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
          <img
            src={loginForm}
            alt="login-form"
            className={styles.imgContainerBg}
          />
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
              disabled={Object.keys(errors).length > 0}
            >
              {isRegisterForm ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
