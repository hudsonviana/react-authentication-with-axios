import apiClient from '../api/apiClient';
import { useAuth } from './useAuth';
import { jwtDecode } from 'jwt-decode';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await apiClient.post('/auth/refresh', {
      refreshToken,
      withCredentials: true,
    });

    const { accessToken } = response.data;
    const decoded = jwtDecode(accessToken);
    const { auth: user, auth: { role } = {} } = decoded;

    // Update the auth state
    setAuth((prev) => ({
      ...prev,
      user: user || prev.user,
      role: role || prev.role,
      accessToken,
    }));

    // if (!auth.user && !auth.role) {
    //   const decoded = jwtDecode(response?.data?.accessToken);
    //   const user = decoded?.auth;
    //   const role = decoded?.auth?.role;
    //   setAuth((prev) => {
    //     return { ...prev, user, role, accessToken: response.data.accessToken };
    //   });
    // }

    // setAuth((prev) => {
    //   // console.log(JSON.stringify(prev));
    //   // console.log(response.data.accessToken);
    //   return { ...prev, accessToken: response.data.accessToken };
    // });

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
