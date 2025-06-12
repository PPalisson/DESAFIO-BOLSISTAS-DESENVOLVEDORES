import React from 'react';
// 'useHistory' é um hook do react-router-dom para navegar programaticamente.
import { useHistory } from 'react-router-dom';
import './Home.css';// Estilos específicos da página
import ParticlesBackground from '../components/ParticlesBackground'; // Componente de plano de fundo com partículas.


function Home() {
  // Inicializa o hook de histórico para poder redirecionar o usuário.
  const history = useHistory();

  return (
  <div className="home-container">
    {/* Renderiza o componente de fundo animado. */}
    <ParticlesBackground />
    {/* 'overlay' é um container que fica sobre o fundo de partículas. */}
    <div className="overlay">
      <h1> <span class="emoji">👋</span>  Seja bem-vindo!</h1>
      <p>Acesse o sistema de login</p>
       {/* Botão que, ao ser clicado, usa o history.push para navegar para a rota '/login'. */}
      <button onClick={() => history.push('/login')}>
        Entrar
      </button>
    </div>
  </div>
);

}

export default Home;
