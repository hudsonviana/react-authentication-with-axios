import { useState } from 'react';
import apiClient from '../api/apiClient';

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

  const getUsers = async ({ signal, token }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get('/users', {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      });
      return response.data;
    } catch (error) {
      setError(
        error.response
          ? error.response.data
          : 'Ocorreu um erro ao tentar retorar os usuários'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, validateToken, getUsers, loading, error };
};
