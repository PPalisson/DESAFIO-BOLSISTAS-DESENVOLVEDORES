import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';
import './Login.css';

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      history.push('/produto');
    } else {
      alert('Preencha os campos!');
    }
  };

  return (
    <div className="login-container">
      <ParticlesBackground />
      <div className="login-card">
        <h2>🔐 Acesse sua conta</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
