import { supabase } from "./config.js";

// login
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) throw new Error(error.message);
    localStorage.setItem('sb_token', data.session.access_token);
    return data;
}

// logout
export function logout() {
    localStorage.removeItem('sb_token');
    window.location.href = 'index.html';
}

// verifica autenticação
export function verificaAutenticacao() {
    const token = localStorage.getItem('sb_token');
    if (!token) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// novo usuário
export async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) throw new Error(error.message);
    return data;
}

// upload de imagem
export async function uploadImage(file) {
    // Cria um nome de arquivo único 
    const fileName = `${Date.now()}-${file.name}`;

    // Faz o upload para o bucket 'imagens' no supabase
    const { data, error } = await supabase.storage
        .from('imagens')
        .upload(fileName, file);

    if (error) {
        console.error("Erro no upload:", error);
        throw new Error(error.message);
    }

    // Pega a URL pública da imagem
    const { data: publicData } = supabase.storage
        .from('imagens')
        .getPublicUrl(fileName);

    return publicData.publicUrl;
}