import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="form-login-container">
      <h2>Meu App</h2>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
