import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const checkTokenOnLoad = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkTokenOnLoad();
  }, []);

  // En el AuthProvider
const login = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:3000/login', credentials);

    if (response.status === 200) {
      const { accessToken } = response.data;
      console.log(accessToken)
      localStorage.setItem('token', accessToken);
      setIsAuthenticated(true);
    } else {
      console.error('Error en el inicio de sesión:', response.status);
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response || error);
  }
};


  const logout = () => {
    // Lógica de cierre de sesión (puedes eliminar el token JWT, por ejemplo)
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
