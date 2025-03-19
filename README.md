# Gerenciador Financeiro - Backend

Este é o backend de um sistema de gerenciamento financeiro, desenvolvido com **TypeScript**, **Express**, **Mongoose** e outras ferramentas modernas. O projeto segue os princípios **SOLID**, garantindo um código modular, testável e escalável.

## 🛠️ Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express** para gestão de rotas e middleware
- **Mongoose** para interagir com o banco de dados MongoDB Atlas
- **JWT** para autenticação segura dos usuários
- **Jest** para testes unitários
- **Docker** para conteinerização

## 🔧 Instalação e Configuração

1. Clone este repositório:

   ```sh
   git clone https://github.com/vitormendes09/Gerenciamento_Financeiro.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente conforme o modelo abaixo:

   ```env
   DATABASE_URL=mongodb+srv://seu_usuario:senha@seuservidor.mongodb.net/seubanco
   JWT_SECRET=sua_chave_secreta
   ```

4. Execute a aplicação:

   ```sh
   npm run dev
   ```

   A API estará rodando em `http://localhost:3000`

## 📝 Documentação das Rotas

### Autenticação

#### 🔐 Registrar Usuário

- **Rota:** `POST /auth/register`
- **Descrição:** Registra um novo usuário no sistema.
- **Corpo da requisição:**
  ```json
  {
    "name": "Adriano",
    "email": "Adriano@gmail.com",
    "password": "senha123",
    "confirmPassword": "senha123"
  }
  ```

#### 🔐 Login de Usuário

- **Rota:** `POST /auth/login`
- **Descrição:** Permite que um usuário autenticado acesse o sistema.
- **Corpo da requisição:**
  ```json
  {
    "email": "Adriano@gmail.com",
    "password": "senha123"
  }
  ```

### Usuários

#### 👤 Buscar Usuário por ID

- **Rota:** `GET /users/:id`
- **Descrição:** Retorna os dados de um usuário específico.

### Despesas

#### 💰 Criar Despesa

- **Rota:** `POST /expenses`
- **Descrição:** Registra uma nova despesa vinculada a um usuário.
- **Corpo da requisição:**
  ```json
  {
    "userId": "67c3910819b59ec6b6418f7a",
    "description": "luz",
    "amount": 150,
    "date": "2025-02-24T10:00:00Z",
    "category": "casa"
  }
  ```

#### 📅 Buscar Despesa por ID

- **Rota:** `GET /expenses/:id`
- **Descrição:** Retorna uma despesa específica com base no seu ID.

#### 📊 Buscar Despesas por Categoria

- **Rota:** `GET /expenses/category/:id`
- **Descrição:** Lista todas as despesas de um usuário pertencentes a uma determinada categoria.

#### 🗑️ Excluir Despesa

- **Rota:** `DELETE /expenses/:id`
- **Descrição:** Remove uma despesa do sistema.

#### 📊 Relatório Mensal de Despesas

- **Rota:** `GET /expenses/monthly/:userId/:month/:year`
- **Descrição:** Gera um relatório das despesas de um usuário para um mês e ano especificados.
- **Autenticação:** Necessário enviar um **JWT** no cabeçalho da requisição.

## 💪 Testes Automatizados

Os testes são escritos com **Jest** e possuem 100% de cobertura. Para executar os testes:

```sh
npm test
```

## 🚀 Implantação e Escalabilidade

- O backend está pronto para ser hospedado em qualquer provedor de nuvem.
- A arquitetura permite escalabilidade horizontal sem necessidade de modificação do código.

## 🔧 Melhorias Planejadas

- Melhorar o cálculo do relatório mensal de despesas.
- Adicionar uma nova entidade **Salário**, permitindo comparação entre ganhos e despesas.

---

Desenvolvido por **Vitor** 🚀

