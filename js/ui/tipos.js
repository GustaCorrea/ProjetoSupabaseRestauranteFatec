import { buscarTipos } from "../module/tipos.js";

export async function carregarTipos(){
    const dados = await buscarTipos()
    const tbody = document.getElementById('tabelaTipos')
    tbody.innerHTML = ''
    dados.forEach(tipo => {
        const tr = document.createElement('tr')

        tr.innerHTML = `
        <td class='border border-gray-400 p-2'>${tipo.descricao}</td>`
        tbody.appendChild(tr)
    })
}