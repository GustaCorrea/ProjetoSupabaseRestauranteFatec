import { SUPABASE_URL, API_KEY } from "./config.js";
import { logout } from "./auth.js";

const token = localStorage.getItem("sb_token")

// Buscar lançamentos
export async function buscarLancamentos() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/lancamentos?select=*,produto(nome)`, {
      headers: {
        "apikey": API_KEY,
        "Authorization": `Bearer ${token}`
      }
    });
    if (res.status === 401) {
      logout()
    }
    return res.json();
  }


  // Adicionar lançamento
export async function adicionarLancamento(lancamento) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/lancamentos`, {
      method: "POST",
      headers: {
        "apikey": API_KEY,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lancamento)
    });
    if (res.status === 201) { return true; }

    if (res.ok) { return res.json(); }

    try {
        const errorBody = await res.json();
        throw new Error(errorBody.message || `Erro do servidor: Status ${res.status}`);
      } 
      catch (e) { throw new Error(`Falha na requisição: Status ${res.status}`); }
}


// Editar lançamento
export async function editarLancamento(id, dados) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/lancamentos?id=eq.${id}`, {
      method: "PUT",
      headers: {
        "apikey": API_KEY,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });
    if (res.status === 204) { return true; }
  
    if (res.ok) { return res.json(); }
  
    try {
      const errorBody = await res.json();
      throw new Error(errorBody.message || `Erro do servidor: Status ${res.status}`);
    } 
    catch (e) { throw new Error(`Falha na requisição: Status ${res.status}`); }
  }


  