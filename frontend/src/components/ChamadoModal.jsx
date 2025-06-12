import './ChamadoModal.css';

// O componente recebe várias props para controlar seu estado e comportamento
export default function ChamadoModal({ 
    isOpen, // Booleano: define se o modal está visível.
    onClose, // Função: chamada quando o modal deve ser fechado (ex: clique em cancelar).
    onSave, // Função: chamada quando o usuário clica em salvar, passando os dados do chamado.
    chamado, // Objeto: os dados do chamado atual (vazio para um novo, preenchido para edição).
    setChamado, // Função: permite que este componente modifique o estado do chamado na página pai.
}) {
    // Se 'isOpen' for falso, o componente não renderiza nada.
    if (!isOpen) return null;
    
    // Handler genérico para atualizar o estado 'chamado' conforme o usuário digita nos inputs.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setChamado(prev => ({ ...prev, [name]: value }));
    };

     // Função chamada ao clicar no botão de salvar.
    const salvar = () => {
        // Validação simples para garantir que os campos não estão vazios.
        if (!chamado.title || !chamado.description) {
            alert('Preencha título e descrição');
            return;
        }

        onSave(chamado); // Chama a função 'onSave' passada pela página pai, enviando os dados do formulário.
    };

    return (
        // O overlay escurece o fundo da página.
        <div className="modalOverlay">
            {/* O conteúdo do modal em si. */}
            <div className="modalContent">
                {/* O título do modal muda se for uma edição ou criação. */}
                <h3>{chamado?.id ? 'Editar Chamado' : 'Novo Chamado'}</h3>

               {/* O campo ID só é exibido se for uma edição (se o chamado já tiver um ID). */}
                {chamado?.id && (
                    <input
                        className="input"
                        placeholder="ID"
                        name="id"
                        value={chamado.id}
                        disabled
                    />
                )}
                 
                 {/* Inputs controlados para título e descrição. */}
                <input
                    className="input"
                    placeholder="Título"
                    name="title"
                    value={chamado.title}
                    onChange={handleChange}
                />

                <textarea
                    className="input"
                    placeholder="Descrição"
                    name="description"
                    value={chamado.description}
                    onChange={handleChange}
                />

                <div className="modalButtons">
                    <button className="button" onClick={salvar}>SALVAR</button>
                    <button className="button cancel" onClick={onClose}>CANCELAR</button>
                </div>
            </div>
        </div>
    );
}
