import { useState } from 'react';
import { useApi } from '../hooks/useApi.js';
import { useAuth } from '../hooks/useAuth.js';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const api = useApi();
  const loading = api.loading;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const data = await api.login({ email, password });
    const user = data?.auth;
    const accessToken = data?.token;
    const role = data?.auth?.role;

    setAuth({ user, accessToken, role });

    if (user && accessToken) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleInputChange}
        />
        <input type="submit" value="Entrar" />
      </form>
      {loading && <p>Carregando...</p>}
    </div>
  );
};

export default Login;
