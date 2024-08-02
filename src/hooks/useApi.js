import axios from 'axios';
import { useState } from 'react';

const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      setError(
        error.response ? error.response.data : 'Ocorreu um erro ao tentar login'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    return true;
  };

  const validateToken = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/validate', { token });
      return response.data;
    } catch (error) {
      setError(
        error.response
          ? error.response.data
          : 'Ocorreu um erro ao tentar validar token'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, validateToken, loading, error };
};
