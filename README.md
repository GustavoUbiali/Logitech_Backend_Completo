# LogiTech Express — Back-End

Projeto final de Back-End baseado no cenário de crise apresentado no material da UC. O objetivo é deixar uma base organizada para a próxima UC de testes, separando acesso a dados, regras de negócio, controllers e rotas.

## 1. Tecnologias

- Node.js + Express
- MySQL + mysql2/promise
- dotenv para credenciais
- Jest + Supertest para testes futuros
- MVC + Repository em estrutura de camadas

## 2. Estrutura

```text
logitech-express-backend/
├── database/
│   └── schema.sql
├── docs/
│   └── DER.md
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── validators/
├── tests/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── TESTS.md
├── api-contracts.md
├── Kanban.md
└── server.js
```

## 3. Instalação

```bash
npm install
```

Copie `.env.example` para `.env` e preencha as credenciais locais do MySQL.

Depois, no MySQL Workbench, execute `database/schema.sql`.

Inicie:

```bash
npm run dev
```

A API ficará em `http://localhost:3000`.

## 4. Endpoints principais

| Método | Rota | Função |
|---|---|---|
| GET | /health | Verificar disponibilidade |
| GET/POST | /api/motoristas | Listar/cadastrar motoristas |
| GET/PUT/DELETE | /api/motoristas/:id | Consultar/editar/remover motorista |
| GET/POST | /api/veiculos | Listar/cadastrar veículos |
| GET/PUT/DELETE | /api/veiculos/:id | Consultar/editar/remover veículo |
| GET/POST | /api/rotas | Listar/cadastrar rotas |
| GET/PUT/DELETE | /api/rotas/:id | Consultar/editar/remover rota |
| GET/POST | /api/coletas | Listar/cadastrar coletas |
| GET/PUT/DELETE | /api/coletas/:id | Consultar/editar/remover coleta |
| GET/POST | /api/entregas | Listar/cadastrar entregas |
| GET/PUT/PATCH/DELETE | /api/entregas/:id | Consultar/editar/status/remover entrega |
| GET/POST/DELETE | /api/itens | Listar/cadastrar/remover itens |

## 5. Segurança

Credenciais não ficam no código. O arquivo `.env` está ignorado pelo Git e o repositório traz somente `.env.example`.

## 6. Observações arquiteturais

- `routes` define os endpoints.
- `controllers` recebe requisição e monta a resposta.
- `services` concentra regras reutilizáveis.
- `repositories` concentra SQL e comunicação com MySQL.
- `middlewares` trata erros e rotas inexistentes.
- `config` mantém a infraestrutura de banco.

## 7. Limites deste esqueleto

O material da UC pede planejamento, estrutura, modelagem, documentação e preparação para testes. Autenticação, autorização, testes automatizados completos, logs estruturados, cache e observabilidade ficam como evolução para etapas posteriores e não foram apresentados como entregas obrigatórias no documento-base.
