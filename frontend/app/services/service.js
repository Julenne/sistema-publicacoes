import api from "./api";

// 1. Obter todas as publicações #FOI
export const getDados = () => api.get("/dados");

// 2. Procurar artigos que contenham uma palavra-chave #FOI
export const getPublicacoesPorPalavraChave = (palavra) =>
    api.get("/lista-palavra-chave", {
        params: { palavra },
    });

export const getInicioPublicacoes = () =>
    api.get("/inicio");


export const getPublicacoesPorAutor = (nomeAutor) => //FOI
    api.get("/publicacoes-autor", {
        params: { nomeAutor },
    });

// 3. Contar publicações de um autor específico #foi
export const getTotalPublicacoesPorAutor = (nomeAutor) =>
    api.get("/total-publicacoes-autor", {
        params: { nomeAutor },
    });

// 4. Listar todas as publicações de um local #FOI
export const getPublicacoesPorLocal = (nomeLocal) =>
    api.get("/publicacoes-por-local", {
        params: { nomeLocal },
    });

// 5. Ano mais recente de publicação de um autor
export const getAnoMaisRecentePorAutor = (nomeAutor) =>
    api.get("/ano-recente-autor", {
        params: { nomeAutor },
    });

// 6. Obter os artigos salvos por um usuário específico #foi
export const getArtigosSalvosPorUsuario = (idUsuario) =>
    api.get("/artigos-salvos", {
        params: { idUsuario },
    });

// 7. Contar quantos usuários salvaram uma publicação #FOI
export const getUsuariosPorPublicacao = (tituloPublicacao) =>
    api.get("/usuarios-por-publicacao", {
        params: { tituloPublicacao },
    });

// 8. Ranking dos locais com publicações mais salvas #foi
export const getRankingLocais = () => api.get("/ranking-locais");

