import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./AdicionaEditaPublicacaoModal.css";
import { PublicacaoService } from "../../services/PublicacaoServices";
import { ActionMode } from "../../constants/index";

function AdicionaEditaPublicacaoModal({
  closeModal,
  onCreatePublicacao,
  mode,
  publicacaoToUpdate,
  onUpdatePublicacao,
}) {
  const form = {
    preco: publicacaoToUpdate?.preco ?? "",
    sabor: publicacaoToUpdate?.sabor ?? "",
    recheio: publicacaoToUpdate?.recheio ?? "",
    descricao: publicacaoToUpdate?.descricao ?? "",
    foto: publicacaoToUpdate?.foto ?? "",
  };

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      state.descricao.length &&
        state.foto.length &&
        state.sabor.length &&
        String(state.preco).length
    );

    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const handleSend = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split("\\").pop();

    const { sabor, recheio, descricao, preco, foto } = state;

    const titulo = sabor + (recheio && " com " + recheio);

    const publicacao = {
      ...(publicacaoToUpdate && { _id: publicacaoToUpdate?.id }),
      sabor: titulo,
      descricao,
      preco,
      foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
    };

    const serviceCall = {
      [ActionMode.NORMAL]: () => PublicacaoService.create(publicacao),
      [ActionMode.ATUALIZAR]: () =>
        PublicacaoService.updtateById(publicacaoToUpdate?.id, publicacao),
    };

    const response = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreatePublicacao(response),
      [ActionMode.ATUALIZAR]: () => onUpdatePublicacao(response),
    };

    actionResponse[mode]();

    const reset = {
      preco: "",
      sabor: "",
      recheio: "",
      descricao: "",
      foto: "",
    };

    setState(reset);

    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaPublicacaoModal">
        <form autoComplete="off">
          <h2>
            {" "}
            {ActionMode.ATUALIZAR === mode ? "Atualizar" : "Adicionar ao"}{" "}
            Cardápio{" "}
          </h2>
          <div>
            <label className="AdicionaPublicacaoModal__text" htmlFor="preco">
              {" "}
              Preco:{" "}
            </label>
            <input
              id="preco"
              placeholder="10,00"
              type="text"
              value={state.preco}
              onChange={(e) => handleChange(e, "preco")}
            />
          </div>
          <div>
            <label className="AdicionaPublicacaoModal__text" htmlFor="sabor">
              {" "}
              Sabor:{" "}
            </label>
            <input
              id="sabor"
              placeholder="Chocolate"
              type="text"
              value={state.sabor}
              onChange={(e) => handleChange(e, "sabor")}
            />
          </div>
          <div>
            <label className="AdicionaPublicacaoModal__text" htmlFor="recheio">
              {" "}
              Recheio:{" "}
            </label>
            <input
              id="recheio"
              placeholder="Banana"
              type="text"
              value={state.recheio}
              onChange={(e) => handleChange(e, "recheio")}
            />
          </div>
          <div>
            <label
              className="AdicionaPublicacaoModal__text"
              htmlFor="descricao"
            >
              {" "}
              Descricao:{" "}
            </label>
            <input
              id="descricao"
              placeholder="Detalhe o produto"
              type="text"
              value={state.descricao}
              onChange={(e) => handleChange(e, "descricao")}
            />
          </div>
          <div>
            <label
              className="AdicionaPublicacaoModal__text  AdicionaPublicacaoModal__foto-label"
              htmlFor="foto"
            >
              {!state.foto.length ? "Selecionar Imagem" : state.foto}
            </label>
            <input
              className=" AdicionaPublicacaoModal__foto"
              id="foto"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              value={state.foto}
              onChange={(e) => handleChange(e, "foto")}
            />
          </div>

          <button
            className="AdicionaPublicacaoModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? "Enviar" : "Atualizar"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaEditaPublicacaoModal;
