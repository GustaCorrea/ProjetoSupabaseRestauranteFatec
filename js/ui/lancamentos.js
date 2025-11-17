import { uploadImage } from "../module/auth.js";
import { insertProduto, buscarProdutos } from "../module/produtos.js";
import { buscarTipos } from "../module/tipos.js";

// Carrega os produtos na tabela ao lado 
export async function carregarTabelaLancamentos() {
    const dados = await buscarProdutos(); 
    const tbody = document.getElementById('tabelaLancamentos');
    tbody.innerHTML = ''; 

    if (!dados || dados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="bg-blue-100 text-blue-500 p-4 text-center">Ainda não há nenhum produto cadastrado!</td></tr>`;
        return;
    }

    dados.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class='border p-2'><img src="${produto.imagem_url}" alt="${produto.nome}" class="w-16 h-16 object-cover rounded"></td>
            <td class='border p-2'>${produto.nome}</td>
            <td class='border p-2'>${produto.tipo ? produto.tipo.descricao : 'N/A'}</td> 
            <td class='border p-2'>${produto.descricao || ''}</td>
            <td class='border p-2'>R$ ${produto.valor.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// prepara o formulário 
export async function carregarFormularioLancamento() {
    const form = document.getElementById('formLancamento');
    const selectTipo = document.getElementById('tipo_id');

    // Carregar os tipos no dropdown
    try {
        const tipos = await buscarTipos();
        selectTipo.innerHTML = '<option value="" disabled selected>Selecione o Tipo</option>';
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id; // Salva o UUID do tipo
            option.textContent = tipo.descricao;
            selectTipo.appendChild(option);
        });
    } catch (err) {
        selectTipo.innerHTML = '<option value="" disabled>Erro ao carregar tipos</option>';
        console.error("Erro ao buscar tipos:", err);
    }

    // Adicionar o "escutador" para salvar
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Pegar todos os dados do formulário
        const nome = document.getElementById('nomeProd').value;
        const tipo_id = document.getElementById('tipo_id').value;
        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const file = document.getElementById('imagem').files[0];

        if (!nome || !tipo_id || !descricao || !valor || !file) {
            Swal.fire('Erro', 'Todos os campos são obrigatórios!', 'error');
            return;
        }

        try {
            const publicURL = await uploadImage(file);
            
            // Montar o objeto para salvar no banco
            const produto = {
                nome: nome,
                tipo_id: tipo_id,
                descricao: descricao,
                valor: valor,
                imagem_url: publicURL 
            };

            // Inserir na tabela "produto"
            await insertProduto(produto);

            await Swal.fire('Sucesso!', 'Produto cadastrado!', 'success');
            form.reset();
            
            // Atualizar a tabela ao lado
            await carregarTabelaLancamentos();

        } catch (err) {
            console.error("Erro ao salvar produto:", err);
            Swal.fire('Erro', `Ocorreu um erro: ${err.message}`, 'error');
        }
    });
}