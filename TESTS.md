# Plano de Testes — LogiTech Express

Documento preparado para a próxima UC, conforme a orientação do projeto de deixar os cenários e validações documentados antes da implementação dos testes.

## 1. Saúde da API

| ID | Cenário | Endpoint | Esperado |
|---|---|---|---|
| T01 | API online | GET /health | 200 + status ok |
| T02 | Rota inexistente | GET /rota-que-nao-existe | 404 + JSON de erro |

## 2. Motoristas

| ID | Cenário | Esperado |
|---|---|---|
| M01 | Criar motorista válido | 201 |
| M02 | Criar sem nome | 400 |
| M03 | Criar CPF duplicado | 4xx por restrição UNIQUE |
| M04 | Consultar ID existente | 200 |
| M05 | Consultar ID inexistente | 404 |
| M06 | Atualizar motorista | 200 |
| M07 | Remover motorista sem dependências | 204 |
| M08 | Remover motorista referenciado por coleta/entrega | bloqueio por FK RESTRICT |

## 3. Veículos

| ID | Cenário | Esperado |
|---|---|---|
| V01 | Criar veículo válido | 201 |
| V02 | Capacidade negativa | 400 |
| V03 | Placa duplicada | 4xx |
| V04 | Associar motorista existente | 201 |
| V05 | Associar motorista inexistente | 4xx por FK |

## 4. Rotas

| ID | Cenário | Esperado |
|---|---|---|
| R01 | Criar rota válida | 201 |
| R02 | Sem origem | 400 |
| R03 | Código repetido | 4xx |
| R04 | Atualizar status | 200 |

## 5. Entregas

| ID | Cenário | Esperado |
|---|---|---|
| E01 | Criar entrega com relacionamentos válidos | 201 |
| E02 | Peso negativo | 400 |
| E03 | Rota inexistente | 4xx |
| E04 | Atualizar status para EM_TRANSITO | 200 |
| E05 | Status fora do conjunto permitido | 400 |
| E06 | Consultar entrega inexistente | 404 |

## 6. Coletas

| ID | Cenário | Esperado |
|---|---|---|
| C01 | Criar coleta válida | 201 |
| C02 | Data obrigatória ausente | 400 |
| C03 | Rota inexistente | 4xx |

## 7. Estoque e normalização

| ID | Cenário | Esperado |
|---|---|---|
| I01 | Criar item com estoque inicial | 201 |
| I02 | Impedir nome de item duplicado | 4xx |
| I03 | Consultar itens com estoque | 200 + quantidade separada |
| I04 | Associar um item a vários veículos | permitido pela N:N |

## 8. Segurança/configuração

| ID | Cenário | Esperado |
|---|---|---|
| S01 | `.env` presente localmente | credenciais carregadas sem hard-code |
| S02 | `.env` não versionado | arquivo coberto pelo `.gitignore` |
| S03 | Senha incorreta do banco | aplicação não deve operar normalmente; conexão deve falhar |

## Critérios de aceite

- Respostas seguem JSON previsível.
- Erros retornam status HTTP coerente e mensagem objetiva.
- Chaves estrangeiras preservam integridade.
- Entradas obrigatórias são validadas antes do acesso ao banco.
- Credenciais não aparecem no código-fonte nem no repositório.
