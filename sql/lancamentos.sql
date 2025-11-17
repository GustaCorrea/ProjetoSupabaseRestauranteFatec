-- Tabela Lançamentos do pedido
create table if not exists lancamentos (
    id uuid constraint pk_lancamentos primary key default gen_random_uuid(),
    user_id uuid constraint fk_lancamentos_user references auth.users on delete cascade
                 constraint df_lancamentos_user DEFAULT auth.uid(),
    
    tipo_id uuid constraint pk_produtos_tipo references tipo(id) on delete restrict,
    
    produto varchar(100),
    valor numeric(12,2) not null constraint ck_lancamentos_valor check (valor >= 0),
    descricao varchar(200),
);


-- Políticas

alter table lancamentos enable row level security;

-- SELECT
CREATE POLICY "Permitir SELECT apenas para o próprio usuário"
ON lancamentos
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT
CREATE POLICY "Permitir INSERT para usuários autenticados"
ON lancamentos
FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "Permitir UPDATE apenas para o próprio usuário"
ON lancamentos
FOR UPDATE
USING (auth.uid() = user_id);

-- DELETE
CREATE POLICY "Permitir DELETE apenas para o próprio usuário"
ON lancamentos
FOR DELETE
USING (auth.uid() = user_id);