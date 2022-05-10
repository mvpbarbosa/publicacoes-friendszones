import React, { useState, useEffect, useCallback } from "react";
import PublicacaoListaItem from "../PublicacaoListaItem/PublicacaoListaItem";
import { PublicacaoService } from "../../services/PublicacaoServices";
import PublicacoesDetalhesModal from "../PublicacoesDetalhesModal/PublicacoesDetalhesModal";
import { ActionMode } from "../../constants/index";

function PublicacoesLista({
  publicacaoCriada,
  mode,
  updatePublicacao,
  deletePublicacao,
}) {
  const [publicacoes, setPublicacoes] = useState([]);

  const [publicacaoSelecionada, setPublicacaoSelecionada] = useState({});

  const [publicacaoModal, setPublicacaoModal] = useState(false);

  const addLike = (publicacaoIndex) => {
    const publicacao = {
      [publicacaoIndex]:
        Number(publicacaoSelecionada[publicacaoIndex] || 0) + 1,
    };
    setPublicacaoSelecionada({ ...publicacaoSelecionada, ...publicacao });
  };

  const removeLike = (publicacaoIndex) => {
    const publicacao = {
      [publicacaoIndex]:
        Number(publicacaoSelecionada[publicacaoIndex] || 0) - 1,
    };

    setPublicacaoSelecionada({ ...publicacaoSelecionada, ...publicacao });
  };

  const getLista = async () => {
    const response = await PublicacaoService.getLista();
    setPublicacoes(response);
  };

  useEffect(() => {
    getLista();
  }, []);

  const getPublicacaoById = async (publicacaoId) => {
    const response = await PublicacaoService.getById(publicacaoId);

    const mapper = {
      [ActionMode.NORMAL]: () => setPublicacaoModal(response),
      [ActionMode.ATUALIZAR]: () => updatePublicacao(response),
      [ActionMode.DELETAR]: () => deletePublicacao(response),
    };

    mapper[mode]();
  };

  const adicionaPublicacaoNaLista = useCallback(
    (publicacao) => {
      const lista = [...publicacoes, publicacao];
      setPublicacoes(lista);
    },
    [publicacoes]
  );

  useEffect(() => {
    if (
      publicacaoCriada &&
      !publicacoes.map(({ id }) => id).includes(publicacaoCriada.id)
    ) {
      adicionaPublicacaoNaLista(publicacaoCriada);
    }
  }, [adicionaPublicacaoNaLista, publicacaoCriada, publicacoes]);

  return (
    <section className="PublicacaoLista">
      {publicacoes.map((publicacao, index) => (
        <PublicacaoListaItem
          mode={mode}
          key={`PublicacaoListaItem-${index}`}
          publicacao={publicacao}
          publicacaoCurtida={publicacaoSelecionada[index]}
          index={index}
          onRemove={(index) => removeLike(index)}
          onAdd={(index) => addLike(index)}
          clickItem={(publicacaoId) => setPublicacaoModal(publicacaoId)}
        />
      ))}
      {publicacaoModal && (
        <PublicacoesDetalhesModal
          publicacao={publicacaoModal}
          closeModal={() => setPublicacaoModal(false)}
        />
      )}
    </section>
  );
}

export default PublicacoesLista;
