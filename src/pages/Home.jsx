import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <h3>Home</h3>
      <p>Página inicial</p>

      {auth.user && <button onClick={signOut}>Sair</button>}
    </div>
  );
};

export default Home;
