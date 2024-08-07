import { useAuth } from './useAuth';
import useApiPrivate from './useApiPrivate';

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const apiPrivate = useApiPrivate();

  const logout = async () => {
    const { id } = auth.user;

    try {
      const response = await apiPrivate.put(
        '/auth/logout',
        { id },
        {
          withCredentials: true,
        }
      );

      if (response?.data?.logout) {
        setAuth({});
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
