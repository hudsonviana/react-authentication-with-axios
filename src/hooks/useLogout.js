import apiClient from '../api/apiClient';
import { useAuth } from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await apiClient.post
    } catch (error) {
      
    }
  };
};
