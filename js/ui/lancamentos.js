import { uploadImage } from "../module/auth.js";
import {
    insertProduto,
    buscarProdutos,
    excluirProduto,
    buscarProdutoPorId,
    atualizarProduto
} from "../module/produtos.js";
import { buscarTipos } from "../module/tipos.js";

const form = document.getElementById('formLancamento');
const tbody = document.getElementById('tabelaLancamentos');
const selectTipo = document.getElementById('tipo_id');

// carrega a tabela com produtos
export async function carregarTabelaLancamentos() {
    const produtos = await buscarProdutos();
    tbody.innerHTML = '';

    if (!produtos || produtos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class='border p-2'><img src="${produto.imagem_url}" alt="${produto.nome}" class="w-16 h-16 object-cover rounded"></td>
            <td class='border p-2'>${produto.nome}</td>
            <td class='border p-2'>${produto.tipo.descricao}</td>
            <td class='border p-2'>R$ ${produto.valor.toFixed(2)}</td>
            <td class='border p-2'>
                <button data-id="${produto.id}" class="btn-editar bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                <button data-id="${produto.id}" class="btn-excluir bg-red-500 text-white px-3 py-1 rounded">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// carrega formulario
export async function carregarFormularioLancamento() {

    try {
        const tipos = await buscarTipos();
        selectTipo.innerHTML = '<option value="" disabled selected>Selecione o Tipo</option>';
        tipos.forEach(tipo => {
            selectTipo.innerHTML += `<option value="${tipo.id}">${tipo.descricao}</option>`;
        });
    } catch (err) { console.error("Erro ao carregar tipos:", err); }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idSendoEditado = form.dataset.id;
        const fileInput = document.getElementById('imagem');
        const file = fileInput.files[0];

        if (!idSendoEditado && !file) {
            Swal.fire('Erro', 'A imagem é obrigatória ao criar um novo produto.', 'error');
            return;
        }

        try {
            let publicURL = null;
            if (file) {
                publicURL = await uploadImage(file);
            }
            const produto = {
                nome: document.getElementById('nomeProd').value,
                tipo_id: document.getElementById('tipo_id').value,
                descricao: document.getElementById('descricao').value,
                valor: parseFloat(document.getElementById('valor').value),
            };
            if (publicURL) {
                produto.imagem_url = publicURL;
            }
            if (idSendoEditado) {
                await atualizarProduto(idSendoEditado, produto);
                Swal.fire('Sucesso!', 'Produto atualizado.', 'success');
            } else {
                await insertProduto(produto);
                Swal.fire('Sucesso!', 'Produto cadastrado.', 'success');
            }
            form.reset();
            delete form.dataset.id; 
            document.getElementById('form-titulo').textContent = 'Novo Lançamento';
            document.getElementById('btnSalvar').textContent = 'Salvar';
            await carregarTabelaLancamentos();
        } catch (err) {
            Swal.fire('Erro', `Ocorreu um erro: ${err.message}`, 'error');
        }
    });
}

// ativa os botoes de açao
export function ativarBotoesAcao() {
    tbody.addEventListener('click', async (e) => {

        // excluir
        if (e.target.classList.contains('btn-excluir')) {
            const id = e.target.dataset.id;

            // SweetAlert
            const result = await Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá reverter isso!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    await excluirProduto(id);
                    await Swal.fire('Excluído!', 'O produto foi excluído.', 'success');
                    await carregarTabelaLancamentos();
                } catch (err) {
                    Swal.fire('Erro!', err.message, 'error');
                }
            }
        }

        // editar
        if (e.target.classList.contains('btn-editar')) {
            const id = e.target.dataset.id;

            try {
                const produto = await buscarProdutoPorId(id);

                document.getElementById('nomeProd').value = produto.nome;
                document.getElementById('tipo_id').value = produto.tipo.id;
                document.getElementById('descricao').value = produto.descricao;
                document.getElementById('valor').value = produto.valor;

                form.dataset.id = id; 

                document.getElementById('form-titulo').textContent = `Editando: ${produto.nome}`;
                document.getElementById('btnSalvar').textContent = 'Atualizar';

                window.scrollTo(0, 0);

            } catch (err) {
                Swal.fire('Erro!', `Não foi possível carregar o produto: ${err.message}`, 'error');
            }
        }
    });
}