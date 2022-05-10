import "./PublicacoesDetalhesModal.css";
import Modal from "../Modal/Modal.jsx";

function PublicacoesDetalhesModal({ publicacao, closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <div className="PublicacoesDetalhesModal">
        <div className="PublicacoesDetalhesModal__Header">
          <img
            src={publicacao.foto}
            alt=""
            className="PublicacoesDetalhesModal__foto"
          />
          <div className="nomeHora">
            <h3>{publicacao.nome}</h3>
            <h4>{publicacao.dataHora}</h4>
          </div>
        </div>

        <div className="PublicacoesDetalhesModal__Main">
          <h4>{publicacao.texto}</h4>
        </div>
      </div>
    </Modal>
  );
}

export default PublicacoesDetalhesModal;
