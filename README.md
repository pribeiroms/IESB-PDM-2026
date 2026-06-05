# Gestão Financeira

Aplicativo mobile de gestão financeira desenvolvido com React Native e Expo, com backend em Node.js, Express e Prisma. O projeto permite controlar receitas e despesas, organizar transações por categoria, visualizar resumo financeiro e manter os dados salvos em banco de dados.

## Funcionalidades

### Frontend

- Login integrado com a rota `POST /auth/login`.
- Mensagem de boas-vindas com o usuário autenticado.
- Cadastro de receitas e despesas.
- Filtro de mês/ano nas telas de lista e resumo.
- Listagem de transações com `FlatList`.
- Edição e exclusão de transações por toque longo e modal.
- Categorias customizadas além das categorias padrão.
- Aba de resumo com saldo, valores por categoria e gráfico.

### Backend

- API REST com Express.
- Banco de dados MySQL usando Prisma.
- Rotas de autenticação, categorias e transações.
- Validação de dados com Zod.
- Categorias salvas no banco e criadas via API.
- Transações salvas no banco, não apenas em memória.
- API Client HTTP integrado ao frontend.
- Arquivos `.env.example` para configuração.
- Collection do Postman versionada para testes da API.

## Como Rodar o Projeto

### Caminho do Projeto

Abra o PowerShell e entre na raiz do repositório:

```powershell
cd C:\Users\polly\IESB-PDM-2026\IESB-PDM-2026
```

> Atenção: neste computador existe uma pasta `IESB-PDM-2026` dentro de outra pasta `IESB-PDM-2026`. Por isso o caminho aparece duas vezes.

### Rodar no Meu Computador

Use estes passos quando as dependências, o MySQL e os arquivos `.env` já estiverem configurados.

#### 1. Abrir a API

No primeiro terminal:

```powershell
cd C:\Users\polly\IESB-PDM-2026\IESB-PDM-2026\gestao-financeira-api
npm run dev
```

A API deve mostrar:

```text
API rodando em http://localhost:3000
```

Para testar no navegador, acesse:

```text
http://localhost:3000
```

O retorno esperado é:

```json
{"ok":true,"name":"gestao-financeira-api"}
```

Deixe esse terminal aberto.

#### 2. Abrir o App

Abra outro PowerShell e rode:

```powershell
cd C:\Users\polly\IESB-PDM-2026\IESB-PDM-2026\gestao-financeira
npm start
```

Para abrir na web, pressione:

```text
w
```

Para abrir no celular, escaneie o QR Code com o Expo Go.

### Primeira Configuração

Use estes passos apenas quando o projeto for clonado pela primeira vez ou quando `node_modules`/`.env` ainda não existirem.

#### API

```powershell
cd C:\Users\polly\IESB-PDM-2026\IESB-PDM-2026\gestao-financeira-api
npm install
copy .env.example .env
```

Edite o arquivo `gestao-financeira-api\.env` com os dados do MySQL:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/gestao_financeira"
PORT=3000
```

No MySQL Workbench, crie o banco:

```sql
CREATE DATABASE IF NOT EXISTS gestao_financeira;
```

Depois volte para o PowerShell da API e rode:

```powershell
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

#### App Mobile

Em outro PowerShell:

```powershell
cd C:\Users\polly\IESB-PDM-2026\IESB-PDM-2026\gestao-financeira
npm install
copy .env.example .env
```

Edite o arquivo `gestao-financeira\.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Para celular físico, use o IP local do computador no lugar de `localhost`:

```env
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000
```

Inicie o app:

```powershell
npm start
```

### Login

O login é validado pela API em `POST /auth/login`.

Exemplo:

```text
Usuário: admin
Senha: 123456
```

Resposta esperada:

```json
{
  "id": 1,
  "name": "Polly",
  "username": "admin"
}
```

### Postman

A collection está em:

```text
gestao-financeira-api/postman/collection.json
```

Variável:

```text
baseUrl = http://localhost:3000
```

A collection inclui a requisição `Login`:

```text
POST http://localhost:3000/auth/login
```
