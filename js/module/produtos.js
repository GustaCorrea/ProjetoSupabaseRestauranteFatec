import { supabase } from "./config.js";

// buscar produto
export async function buscarProdutos() {
    const { data, error } = await supabase
        .from('produto')
        .select(`
            id, nome, descricao, valor, imagem_url,
            tipo ( id, descricao ) 
        `);

    if (error) throw new Error(error.message);
    return data;
}

// inserir produto
export async function insertProduto(produto) {
    const { data, error } = await supabase
        .from('produto')
        .insert(produto)
        .select();

    if (error) throw new Error(error.message);
    return data;
}

// editar
export async function atualizarProduto(id, produto) {
    const { data, error } = await supabase
        .from('produto')
        .update(produto)
        .eq('id', id)
        .select();
        
    if (error) throw new Error(error.message);
    return data;
}

// excluir
export async function excluirProduto(id) {
    const { data, error } = await supabase
        .from('produto')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
}

export async function buscarProdutoPorId(id) {
    const { data, error } = await supabase
        .from('produto')
        .select(`*, tipo(id, descricao)`)
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
}