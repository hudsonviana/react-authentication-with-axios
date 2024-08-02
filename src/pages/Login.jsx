import { useContext, useState } from 'react';
import { useApi } from '../hooks/useApi.js';
import AuthContext from '../contexts/AuthProvider.jsx';

const Login = () => {
  const api = useApi();
  const loading = api.loading;
  const { setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const data = await api.login({ email, password });
    const accessToken = data?.token;
    const role = data?.auth?.role;

    setAuth({ email, password, accessToken, role });
  };

  return (
    <div className="form-login-container">
      <h2>Login</h2>
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
