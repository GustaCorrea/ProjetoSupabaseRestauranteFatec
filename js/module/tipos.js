import { supabase } from "./config.js";

// buscar tipos
export async function buscarTipos() {
    const { data, error } = await supabase
        .from('tipo')
        .select('*');

    if (error) {
        console.error("Erro ao buscar tipos:", error);
        throw new Error(error.message);
    }
    return data;
}