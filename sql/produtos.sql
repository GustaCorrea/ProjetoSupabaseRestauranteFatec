create table produto(
    id uuid constraint pk_produtos primary key 
            constraint df_produtos_id default gen_random_uuid(),
    
    nome varchar(100) not null
            constraint uk_produtos_nome unique,
    
    tipo_id uuid constraint pk_produtos_tipo references tipo(id) on delete restrict,
            /*(tipo in ('entrada','principal', 'sobremesa', 'bebida'))*/
    valor numeric(6, 2),
    descricao varchar(200)
);

alter table produto enable row level security;

create policy "Permitir leitura pública dos produtos"
on produto for select using (true);

create policy "Bloquear alterações nos produtos"
on produto for all using (false) with check(false);
-- Apague a política de bloqueio
DROP POLICY "Bloquear alterações nos produtos" ON produto;

-- Crie uma política que permite INSERIR se você estiver logado
CREATE POLICY "Permitir INSERT para usuários autenticados"
ON produto
FOR INSERT
TO authenticated
WITH CHECK (true);

ALTER TABLE produto
ADD COLUMN imagem_url TEXT;