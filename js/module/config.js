// 1. Importa função da biblioteca do Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// 2. variáveis
const SUPABASE_URL = "https://gmseucsfviezegedvonj.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtc2V1Y3NmdmllemVnZWR2b25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MjU0OTUsImV4cCI6MjA3ODMwMTQ5NX0.M8LxtSi-AgTZB6roYYqpU5egQhQcF0vZ2HwNgpDL7CY";

// 3. Cria o objeto supabase com a url e a chave da API
export const supabase = createClient(SUPABASE_URL, API_KEY);