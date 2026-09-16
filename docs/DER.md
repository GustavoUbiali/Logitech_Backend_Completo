# DER — LogiTech Express

Modelo lógico proposto para eliminar os principais problemas descritos no enunciado: motoristas duplicados e itens/ferramentas armazenados como texto separado por vírgulas.

```mermaid
erDiagram
    MOTORISTAS ||--o{ VEICULOS : "conduz"
    MOTORISTAS ||--o{ COLETAS : "realiza"
    MOTORISTAS ||--o{ ENTREGAS : "realiza"
    ROTAS ||--o{ COLETAS : "possui"
    ROTAS ||--o{ ENTREGAS : "possui"
    VEICULOS ||--o{ ENTREGAS : "transporta"
    ITENS ||--|| ESTOQUE : "possui"
    VEICULOS ||--o{ VEICULO_ITENS : "carrega"
    ITENS ||--o{ VEICULO_ITENS : "compõe"

    MOTORISTAS {
      int id PK
      varchar nome
      char cpf UK
      varchar cnh UK
      varchar telefone
      varchar email UK
      enum status
    }
    VEICULOS {
      int id PK
      varchar placa UK
      varchar modelo
      varchar tipo
      decimal capacidade_kg
      enum status
      int motorista_id FK
    }
    ROTAS {
      int id PK
      varchar codigo UK
      varchar origem
      varchar destino
      decimal distancia_km
      datetime data_inicio_prevista
      datetime data_fim_prevista
      enum status
    }
    COLETAS {
      int id PK
      varchar codigo UK
      int rota_id FK
      int motorista_id FK
      varchar endereco_origem
      varchar cidade
      datetime data_agendada
      enum status
    }
    ENTREGAS {
      int id PK
      varchar codigo_rastreio UK
      int rota_id FK
      int motorista_id FK
      int veiculo_id FK
      varchar destinatario_nome
      varchar endereco
      varchar cidade
      decimal peso_kg
      enum status
    }
    ITENS {
      int id PK
      varchar nome UK
      varchar categoria
      varchar unidade_medida
      decimal estoque_minimo
    }
    ESTOQUE {
      int item_id PK, FK
      decimal quantidade
    }
    VEICULO_ITENS {
      int veiculo_id PK, FK
      int item_id PK, FK
      decimal quantidade
    }
```

## Normalização aplicada

**1FN:** não há listas em uma coluna. Itens de frota foram separados em `itens` e na tabela associativa `veiculo_itens`.

**2FN:** atributos dependem da chave da própria entidade. A descrição do item não é repetida em cada veículo.

**3FN:** informações de motorista, veículo, rota e item estão em suas próprias tabelas; as relações usam chaves estrangeiras.
