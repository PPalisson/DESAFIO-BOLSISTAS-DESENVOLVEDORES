import React from 'react';
// Importa os componentes necessários do 'react-router-dom' para gerenciar a navegação.
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Importa os componentes de página que serão usados nas rotas.
import Login from './pages/Login'; 
import Home from './pages/Home';
import ProdutoPage from './pages/ProdutoPage';
function App() {
  return (
        // 'Router' é o componente que envolve toda a aplicação para habilitar o roteamento.
    <Router>
            {/* 'Switch' garante que apenas a primeira rota que corresponder à URL atual seja renderizada. */}
      <Switch>
         {/* 'Route' define uma rota específica. */}
        {/* 'exact path="/"' define a rota para a página inicial exata. */}
        <Route exact path="/" component={Home} />
                {/* Rota para a página de login, acessível em '/login'. */}
        <Route path="/login" component={Login} />
                {/* Rota para a página de produtos/chamados, acessível em '/produto'. */}
        <Route path="/produto" component={ProdutoPage} />
      </Switch>
    </Router>
  );
}

export default App;