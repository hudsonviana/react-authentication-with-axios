import apiClient from '../api/apiClient';
import { useAuth } from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const { refreshToken } = auth;

  const refresh = async () => {
    const response = await apiClient.post('/auth/refresh', {
      refreshToken,
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
