import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.css';
import close from '/icons/imagenes recursos/close.png';
import loginForm from '/icons/imagenes recursos/loginForm.png';
import { useAuth } from '../../../context/AuthContext';


export const LoginForm = ({ setLogin, isRegisterForm, switchForm }) => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); // Usa el hook de autenticación

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
    e.preventDefault();
    // Validaciones
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Correo es requerido';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Contraseña es requerida';
    }
    setErrors(newErrors);

    // Si no hay errores, puedes manejar los datos (por ahora solo log)
    if (Object.keys(newErrors).length === 0) {
      try {
        // Usa la función de login del hook de autenticación
        const success = await login(formData);

        if (success) {
          // Redirige al usuario a la página principal después del inicio de sesión exitoso
          window.location.reload();
        } else {
          // Maneja el caso en que la respuesta del servidor no sea exitosa
          console.error('Error en el inicio de sesión');
        }
      } catch (error) {
        // Maneja errores de red o problemas con la solicitud
        console.error('Error de red:', error.message);
      }
    }
  };

  useEffect(() => {
    // Si el usuario ya está autenticado, redirige a la página principal
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div className={styles.imgContainer}>
          <img src={loginForm} alt="login-form" className={styles.imgContainerBg} />
          <button className={styles.cancelButton} onClick={handleCancel}>
            <img src={close} alt="close-icon" className={styles.cancelButtonImg} />
          </button>
        </div>
        <span className={styles.formTitle}>Iniciar sesión</span>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
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
            {isRegisterForm ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
            <span onClick={switchForm}>
              {isRegisterForm ? 'Registrarte' : 'Iniciar sesión'}
            </span>
          </p>
          <div className={styles.submitButton}>
            <button type="submit" className={styles.button}>
              {isRegisterForm ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


