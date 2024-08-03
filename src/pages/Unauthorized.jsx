import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const gotBack = () => navigate(-1);

  return (
    <div>
      <h3>Não autorizado!</h3>
      <p>Você não tem autorização para acessar esta página.</p>

      <button onClick={gotBack}>Voltar</button>
    </div>
  );
};

export default Unauthorized;
