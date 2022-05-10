import "./Home.css";
import HeaderContainer from "../../components/Header/HeaderContainer";
import PublicacoesLista from "../../components/PublicacoesLista/PublicacaoLista";
import AdicionaEditaPublicacaoModal from "../../components/AdicionaEditaPublicacaoModal/AdicionaEditaPublicacaoModal";
import { useState } from "react";
import { ActionMode } from "../../constants/index";

function Home() {
  const [canShowAdicionaPublicacaoModal, setCanShowAdicionaPublicacaoModal] =
    useState(false);

  const [PublicacaoParaAdicionar, setPublicacaoParaAdicionar] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const [publicacaoParaEditar, setPublicacaoParaEditar] = useState();
  const [publicacaoParaDeletar, setPublicacaoParaDeletar] = useState();

  const handleDeletePublicacao = (publicacaoToDelete) => {
    setPublicacaoParaDeletar(publicacaoToDelete);
  };

  const handleUpdatePublicacao = (publicacaoToUpdate) => {
    setPublicacaoParaEditar(publicacaoToUpdate);
    setCanShowAdicionaPublicacaoModal(true);
  };

  const handleCloseModal = () => {
    setCanShowAdicionaPublicacaoModal(false);
    setPublicacaoParaAdicionar();
    setPublicacaoParaDeletar();
    setPublicacaoParaEditar();
  };

  return (
    <div className="Home__Container">
      <HeaderContainer
        mode={modoAtual}
        createPublicacao={() => setCanShowAdicionaPublicacaoModal(true)}
        updatePublicacao={() => handleActions(ActionMode.ATUALIZAR)}
      />

      <div className="Main">
        <PublicacoesLista
          mode={modoAtual}
          publicacaoCriada={PublicacaoParaAdicionar}
          deletePublicacao={handleDeletePublicacao}
          updatePublicacao={handleUpdatePublicacao}
        />

        {canShowAdicionaPublicacaoModal && (
          <AdicionaEditaPublicacaoModal
            mode={modoAtual}
            publicacaoToUpdate={publicacaoParaEditar}
            closeModal={handleCloseModal}
            onCreatePublicacao={(publicacao) =>
              setPublicacaoParaAdicionar(publicacao)
            }
            onUpdatePublicacao={publicacao => setPublicacaoParaEditar(publicacao)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
