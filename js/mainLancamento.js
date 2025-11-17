import { verificaAutenticacao } from "./module/auth.js";
import { logoutUi } from "./ui/auth.js";
import { carregarFormularioLancamento, carregarTabelaLancamentos, ativarBotoesAcao } from "./ui/lancamentos.js";

document.addEventListener('DOMContentLoaded', () => {
    if (!verificaAutenticacao()) {return}
    logoutUi();
    carregarFormularioLancamento();
    carregarTabelaLancamentos();
    ativarBotoesAcao();
})