import { Api } from "../helpers/Api";

const parseResponse = (response) => response.json();

const transformPublicacao = (publicacao) => {
  const [sabor, recheio] = publicacao.sabor.split(" com ");

  return {
    ...publicacao,
    id: publicacao._id,
    titulo: publicacao.sabor,
    sabor,
    ...(recheio && { recheio }),
    possuiRecheio: Boolean(recheio),
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((publicacoes) =>
    publicacoes.map(transformPublicacao)
  );

const parseTransformItem = (response) =>
  parseResponse(response).then(transformPublicacao);

export const PublicacaoService = {
  getLista: () =>
    fetch(Api.publicacaoLista(), { method: "GET" }).then(parseResponse),
  getById: (id) =>
    fetch(Api.publicacaoById(id), { method: "GET" }).then(parseResponse),
  create: (publicacao) =>
    fetch(Api.createPublicacao(), {
      method: "POST",
      body: JSON.stringify(publicacao),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseTransformItem),
  updtateById: (id) =>
    fetch(Api.updatepublicacaoById(id), { method: "PUT" }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deletepublicacaoById(id), { method: "DELETE" }).then(
      parseResponse
    ),
};
