import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../api/apiClient.js';
import { useAuth } from '../hooks/useAuth.js';

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { accessToken, refreshToken } = response?.data;
      const decoded = jwtDecode(accessToken);
      const user = decoded?.auth;
      const role = decoded?.auth?.role;

      // Store the refreshToken in localStorage
      localStorage.setItem('refreshToken', refreshToken);

      // Set authentication state
      setAuth({ user, role, accessToken });

      if (user && accessToken) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

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
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Confiar neste dispositivo</label>
        </div>
      </form>
    </div>
  );
};

export default Login;
