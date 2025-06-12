import { useEffect, useState } from 'react';
import api from '../api/api'; // Instância do Axios pré-configurada.
import './ProdutoPage.css';
import ChamadoModal from '../components/ChamadoModal';// Componente do modal de criação/edição.
import toast, { Toaster } from 'react-hot-toast'; // Biblioteca para notificações.



export default function ProdutoPage() {
    // --- SEÇÃO DE ESTADOS (useState) --
  const [calleds, setCalleds] = useState([]); // Armazena a lista de chamados vinda da API.

  const [idFilter, setIdFilter] = useState('');// Controla o valor do input de filtro por ID.
  const [titleFilter, setTitleFilter] = useState('');// Controla o valor do input de filtro por Título.
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalAberto, setModalAberto] = useState(false); // Controla a visibilidade do modal.
  const [chamadoSelecionado, setChamadoSelecionado] = useState({ title: '', description: '' });// Armazena os dados do chamado a ser criado/editado

  // --- SEÇÃO DE EFEITOS (useEffect) ---
  // Este useEffect é executado uma vez, quando o componente é montado, para buscar a lista inicial de chamados.
    useEffect(() => {
    fetchCalleds();
  }, []);

       // --- SEÇÃO DE FUNÇÕES (OPERAÇÕES CRUD E OUTRAS) ---

  // Função assíncrona para buscar os chamados na API, com filtros opcionais.
  const fetchCalleds = async (id = null, title = null) => {
    try {
      const params = {}; // Objeto que conterá os parâmetros da query.

      if (id && !isNaN(Number(id))) {
        params.id = Number(id);
      }

      if (title && title.trim() !== '') {
        params.title = title.trim();
      }
      // Faz a requisição GET para a API. Se 'params' não estiver vazio, ele é enviado na URL.
      const response = await api.get('/calleds', {
        params: Object.keys(params).length ? params : undefined,
      });

      console.log('Resposta da API:', response.data);
            
    // Atualiza o estado 'calleds' com os dados recebidos da API.
      setCalleds(response.data.data || response.data);
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
    }
  };
  // Deleta um chamado específico.

  const deletarChamado = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja deletar este chamado?');
    if (!confirmar) return;  // Pede confirmação ao usuário.

    try {
      await api.delete(`/calleds/${id}`); // Faz a requisição DELETE para a API.
      fetchCalleds(); // Recarrega a lista de chamados.
      toast.success('Chamado excluído com sucesso!'); // Exibe notificação de sucesso.
    } catch (error) {
      console.error('Erro ao deletar chamado:', error);
      toast.error('Erro ao deletar chamado');
    }
  };
  // Salva um chamado (seja criando um novo ou atualizando um existente).

  const salvarChamado = async (chamado) => {
    try {
      // Determina o método HTTP (PUT para atualizar, POST para criar) com base na existência do ID.
      const metodo = chamado.id ? 'put' : 'post';
      const url = chamado.id
        ? `/calleds/${chamado.id}`
        : '/calleds';

        // Cria o payload (corpo da requisição) com os dados do chamado.
      const payload = {
        ...chamado,
        createdAt: new Date().toISOString(),
      };

      if (!chamado.id) {
        delete payload.id; // Garante que o ID não seja enviado na criação.
      }

      await api[metodo](url, payload); // Executa a requisição PUT ou POST
      fetchCalleds();  // Recarrega a lista.
      toast.success(`Chamado ${chamado.id ? 'atualizado' : 'criado'} com sucesso!`);
      setModalAberto(false); // Fecha o modal após salvar.
    } catch (error) {
      console.error('Erro ao salvar chamado:', error);
      toast.error('Erro ao salvar chamado');
    }
  };








 
  // Aplica os filtros de ID e Título

  const aplicarFiltros = () => {
    fetchCalleds(idFilter, titleFilter);
  };
 // Limpa os filtros e recarrega todos os chamados
  const limparFiltros = () => {
    setIdFilter('');
    setTitleFilter('');
    fetchCalleds();
  };
   // Exporta a lista de chamados visível para um arquivo CSV.

  const exportarCSV = () => {
    if (calleds.length === 0) {
      toast.error('Nenhum chamado para exportar');
      return;
    }

    const header = 'ID,Título,Descrição,Criado em\n';
    const linhas = calleds.map(c =>
      `${c.id},"${c.title.replace(/"/g, '""')}","${c.description.replace(/"/g, '""')}",${new Date(c.createdAt).toLocaleString()}`
    );

    const csvContent = header + linhas.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a'); // Cria um link de download dinamicamente.
    link.setAttribute('href', url);
    link.setAttribute('download', 'chamados.csv');
    link.click();  // Simula o clique no link para iniciar o download.
  };
  
   // --- SEÇÃO DE RENDERIZAÇÃO (JSX) ---

  return (
    <div  className="produto-wrapper">
       {/* ... Código JSX para renderizar os inputs, botões e a tabela ... */}
      {/* A tabela usa 'calleds.map' para criar uma linha (<tr>) para cada chamado no estado. */}
      {/* Os botões de editar e adicionar abrem o modal, passando os dados do chamado selecionado ou dados vazios. */}
       <div className="container">
      <h2 className="titulo">Chamados</h2>

      <div className="filtroSection">
        <input
          className="input"
          placeholder="Filtrar por ID"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
        />
        <input
          className="input"
          placeholder="Filtrar por Título"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <button className="button" onClick={aplicarFiltros}>
          APLICAR
        </button>
        <button className="button" onClick={limparFiltros}>
          LIMPAR
        </button>





      </div>

      <Toaster position="top-right" reverseOrder={false} />


      <div className="formSection">

        


        {id && (
          <button
            className="button"
            onClick={() => {
              setId('');
              setTitle('');
              setDescription('');
            }}
          >
            CANCELAR
          </button>
        )}
      </div>

      <table className="table">
        {/* ... cabeçalho da tabela ... */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {calleds.map((c) => (
            <tr key={c.id}>
                {/* ... células da tabela (td) ... */}
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>{c.description}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
              <td>
                {/* Botão de editar: define o chamado selecionado e abre o modal */}
                <button onClick={() => {
                  setChamadoSelecionado(c);
                  setModalAberto(true);
                }}>✏️</button>

                {/* Botão de deletar: chama a função de exclusão passando o ID */}
                <button onClick={() => deletarChamado(c.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttonGroup">
        <button className="button small" onClick={exportarCSV}>
          💾 EXPORTAR CSV
        </button>

      {/* Botão para adicionar um novo chamado: limpa o 'chamadoSelecionado' e abre o modal */}
        <button className="button small" onClick={() => {
          setChamadoSelecionado({ title: '', description: '' });
          setModalAberto(true);
        }}>
          ➕ ADICIONAR
        </button>
      </div>
      {/* Renderiza o componente do modal, passando as props necessárias */}

      <ChamadoModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={salvarChamado}
        chamado={chamadoSelecionado}
        setChamado={setChamadoSelecionado}
      />  


    </div>
    </div>
  );
}
