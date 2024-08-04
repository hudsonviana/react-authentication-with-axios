import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const loacation = useLocation();

  return allowedRoles.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to={'/unauthorized'} state={{ from: loacation }} replace />
  ) : (
    <Navigate to={'/login'} state={{ from: loacation }} replace />
  );
  // return auth?.user ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={'/login'} state={{ from: loacation }} replace />
  // );
};

export default RequireAuth;
