create table tipo(
        id uuid constraint pk_tipos primary key
                constraint df_tipos_id default gen_random_uuid(),
        descricao varchar(9) not null
                constraint uk_tipo_descricao
);

CREATE POLICY "Permitir leitura pública dos tipos"
ON tipo
FOR SELECT
USING (true);