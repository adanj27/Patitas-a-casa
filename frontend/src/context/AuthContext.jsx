import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const checkTokenOnLoad = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setIsAuthenticated(true);
        setToken(storedToken);
      }
    };

    checkTokenOnLoad();
  }, []);

  // En el AuthProvider
const login = async (credentials) => {
  try {
    const response = await axios.post('/v1/auth/login', credentials);

    if (response.status === 200) {
      const { mytoken } = response.data;
      localStorage.setItem('token', mytoken);
      setIsAuthenticated(true);
      toast.success('Inicio de sesión exitoso', {
        duration: 2000,
      });
      setToken(mytoken);
      return true
    } else {
      console.error('Error en el inicio de sesión:', response.status);
      return false
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response.data.error);
    toast.error(error.response.data.error);
    return false
  }
};


  const logout = () => {
    // Lógica de cierre de sesión
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
