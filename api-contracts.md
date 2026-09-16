# Contratos de API — LogiTech Express

## POST /api/motoristas

```json
{
  "nome": "Carlos Souza",
  "cpf": "33333333333",
  "cnh": "BR123123123",
  "telefone": "49999992222",
  "email": "carlos@logitech.local"
}
```

## POST /api/veiculos

```json
{
  "placa": "QWE1R23",
  "modelo": "Master",
  "tipo": "VAN",
  "capacidade_kg": 2500,
  "motorista_id": 1
}
```

## POST /api/rotas

```json
{
  "codigo": "R-003",
  "origem": "Joaçaba - SC",
  "destino": "Curitiba - PR",
  "distancia_km": 420.5,
  "data_inicio_prevista": "2026-09-15 08:00:00",
  "data_fim_prevista": "2026-09-15 17:00:00"
}
```

## POST /api/coletas

```json
{
  "codigo": "C-001",
  "rota_id": 1,
  "motorista_id": 1,
  "endereco_origem": "Rua Exemplo, 100",
  "cidade": "Joaçaba",
  "data_agendada": "2026-09-15 09:00:00"
}
```

## POST /api/entregas

```json
{
  "codigo_rastreio": "LT-000001",
  "rota_id": 1,
  "motorista_id": 1,
  "veiculo_id": 1,
  "destinatario_nome": "Empresa Exemplo Ltda.",
  "endereco": "Av. Brasil, 200",
  "cidade": "Chapecó",
  "peso_kg": 320.5
}
```

## PATCH /api/entregas/:id/status

```json
{
  "status": "EM_TRANSITO"
}
```

Status válidos: `PENDENTE`, `EM_TRANSITO`, `ENTREGUE`, `CANCELADA`.
