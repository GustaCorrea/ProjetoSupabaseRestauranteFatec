import { buscarProdutos } from "../module/produtos.js";

export async function carregarProdutos(){
    const dados = await buscarProdutos()
    const tbody = document.getElementById('tabelaProdutos')
    tbody.innerHTML = '' 
    dados.forEach(produto => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td class='border border-gray-400 p-2'>${produto.nome}</td>
        <td class='border border-gray-400 p-2'>${produto.tipo.descricao}</td>`
        tbody.appendChild(tr)
    })
}