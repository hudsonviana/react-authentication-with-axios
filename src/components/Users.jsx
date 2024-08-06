import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useApiPrivate from '../hooks/useApiPrivate';

const Users = () => {
  const [users, setUsers] = useState([]);
  const apiPrivate = useApiPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await apiPrivate.get('/users', {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data?.users);
      } catch (error) {
        console.log('error:', error);
        // navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      // controller.abort();
      isMounted = false;
    };
  }, []);

  return (
    <article>
      <h3>Lista de usuários</h3>

      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user?.firstName}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário para mostrar</p>
      )}
    </article>
  );
};

export default Users;
