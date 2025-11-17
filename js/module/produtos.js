import { supabase } from "./config.js";

// buscar produtos
export async function buscarProdutos() {
    const { data, error } = await supabase
        .from('produto')
        .select(`
            id,
            nome,
            descricao,
            valor,
            imagem_url,
            tipo ( id, descricao ) 
        `);

    if (error) {
        console.error("Erro ao buscar produtos:", error);
        throw new Error(error.message);
    }
    return data;
}

// inserir produto
export async function insertProduto(produto) {
    const { data, error } = await supabase
        .from('produto')
        .insert(produto)
        .select();

    if (error) {
        console.error("Erro ao inserir produto:", error);
        throw new Error(error.message);
    }
    return data;
}