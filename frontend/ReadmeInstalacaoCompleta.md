
# ⚙️ README - Instruções de Instalação do Projeto

Este projeto é composto por duas aplicações:

- **Backend:** API REST desenvolvida em .NET 6 com Entity Framework e PostgreSQL
- **Frontend:** Aplicação web em React 17

---

## 🔧 Requisitos

Antes de iniciar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Visual Studio 2022+](https://visualstudio.microsoft.com/)
- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [PostgreSQL](https://www.postgresql.org/download/)
- Git (opcional, para clonar o repositório)

---

## 🐘 Configuração do Banco de Dados (PostgreSQL)

1. Acesse o **pgAdmin** ou outro cliente PostgreSQL e **crie apenas o banco de dados** com o nome:

```
chamadosdb
```

> ⚠️ Você **NÃO precisa criar a tabela manualmente**. Ela será gerada automaticamente ao aplicar a migration no passo abaixo.

2. Pegue seu usuário e senha do PostgreSQL para configurar a API (próximo passo).

---

## 🔙 Backend (.NET 6)

### 1. Abra o projeto

Abra a pasta do backend no Visual Studio 2022. O projeto se chama `CalledsApi`.

### 2. Configure a conexão com o banco

Abra o arquivo:

```
CalledsApi/appsettings.json
```

Substitua a string de conexão pela sua:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=chamadosdb;Username=postgres;Password=SENHA"
}
```

> Substitua `SENHA` pela senha do seu PostgreSQL.

### 3. Execute os comandos de migração

Abra o **Console do Gerenciador de Pacotes** em:

```
Ferramentas > Gerenciador de Pacotes NuGet > Console do Gerenciador de Pacotes
```

E execute:

```powershell
Add-Migration InitialCreate
Update-Database
```

⚙️ Isso criará automaticamente a tabela `tb_calleds` no banco de dados.

### 4. Execute o projeto

Pressione **F5** para rodar a API. Ela deve abrir em:

```
https://localhost:7159/swagger
```

---

## 🌐 Frontend (React 17)

### 1. Acesse a pasta do frontend:

```bash
cd frontend
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Inicie o servidor React:

```bash
npm start
```

O navegador abrirá em:

```
http://localhost:3000
```

---

## 🚨 Importante

- Certifique-se de que o backend esteja rodando em `https://localhost:7159` para que o front consiga se comunicar com ele.
- O frontend já está configurado para consumir a API REST criada.

---

## 🧪 Teste Final

1. Acesse o front (`localhost:3000`)
2. Faça login com qualquer usuário (login não é validado)
3. Cadastre um chamado e verifique no banco/postman/swagger
4. Teste editar, excluir, filtrar e exportar CSV

---

## ✅ Pronto!

Seu projeto está rodando com sucesso 🎉
