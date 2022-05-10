import "./PublicacaoListaItem.css";
import { ActionMode } from "../../constants/index";

function PublicacaoListaItem({
  publicacao,
  publicacaoCurtida,
  quantidadeSelecionada,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode,
}) {
  const badgeCounter = (canRender) =>
    Boolean(canRender) && (
      <span className="PublicacaoListaItem__badge">Curtido</span>
    );

  const removeButton = (canRender, index) =>
    Boolean(canRender) && (
      <button
        disabled={mode !== ActionMode.NORMAL}
        className="Acoes__remover"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        remover
      </button>
    );

  const likeAndUnlike = (index) => {
    if (publicacaoCurtida !== 1) {
      onAdd(index);
    } else if (publicacaoCurtida === 1) {
      onRemove(index);
    }
  };

  const badgeAction = (canRender) => {
    if (canRender)
      return <span className="PublicacaoListaItem__tag" onClick={() => clickItem(publicacao.id) }> {mode} </span>;
  };

  return (
    <div
      className={`PublicacaoListaItem ${
        mode !== ActionMode.NORMAL && "PublicacaoListaItem--disable"
      }`}
      
    >
      {badgeAction(mode !== ActionMode.NORMAL)}

      <div className="PublicacaoListaItem__Header">
        <img src={publicacao.foto} alt="Foto de perfil" />
        <div className="nomeHora">
          <h3>{publicacao.nome}</h3>
          <h4>{publicacao.dataHora}</h4>
        </div>
      </div>

      <div className="PublicacaoListaItem__Main"
            onClick={() => clickItem(publicacao.id)}>
        <h4>{publicacao.texto}</h4>
      </div>

      <div className="PublicacaoListaItem__Footer">
        <button onClick={() => likeAndUnlike(index)}>
          <img
            id="Curtir"
            src={require("../../assets/images/curtir-icon.png")}
            alt="Botão de curtir"
          />
        </button>

        {removeButton(quantidadeSelecionada, index)}
        {badgeCounter(publicacaoCurtida, index)}
      </div>
    </div>
  );
}

export default PublicacaoListaItem;
