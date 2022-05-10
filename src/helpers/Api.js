const PublicacaoContext = {
  publicacaoEndpoint: () => `${Api.baseUrl}/publicacoes`,
  publicacaoLista: () =>
    `${PublicacaoContext.publicacaoEndpoint()}/all-publicacoes`,
  publicacaoById: (id) =>
    `${PublicacaoContext.publicacaoEndpoint()}/one-publicacao/${id}`,
  createpublicacao: () =>
    `${PublicacaoContext.publicacaoEndpoint()}/create-publicacao`,
  updatepublicacaoById: (id) =>
    `${PublicacaoContext.publicacaoEndpoint()}/update-publicacao/${id}`,
  deletepublicacaoById: (id) =>
    `${PublicacaoContext.publicacaoEndpoint()}/delete-publicacao/${id}`,
};

export const Api = {
  baseUrl: "http://localhost:3005",
  ...PublicacaoContext,
};
