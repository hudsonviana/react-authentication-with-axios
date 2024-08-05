import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { auth } = useAuth();

  return (
    <div className="form-login-container">
      <div className="credenciais">
        <h2>Meu App</h2>
        {auth.user && <h4>Olá, {auth.user.firstName}!</h4>}
      </div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
