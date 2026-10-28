# Auction Platform - Front-end

Interface web moderna desenvolvida em **React** e **Vite** para a plataforma de leilões online, permitindo navegação em tempo real, lances dinâmicos e controle de carteira.

---

## 🚀 Tecnologias Utilizadas

* **Biblioteca Principal:** React com TypeScript
* **Build Tool:** Vite
* **Estilização:** Tailwind CSS / Styled Components
* **Requisições HTTP:** Axios / Fetch API
* **Hospedagem / Deploy:** Vercel

---

## 📌 Principais Funcionalidades

- **Autenticação:** Telas de Login e Cadastro integradas à API via JWT.
- **Dashboard de Leilões:** Visualização de leilões ativos, lances atuais e histórico.
- **Painel de Lances:** Interface intuitiva para inserção de lances com validações no front-end.
- **Gestão de Carteira:** Exibição do saldo disponível e saldo comprometido em lances.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto front-end com a seguinte variável:

```env
VITE_API_URL=https://auction-backend-1-5u5c.onrender.com
```

> **Atenção:** Certifique-se de não incluir uma barra `/` no final da URL da API.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
* Node.js (v18+)
* npm ou yarn

### Passo a Passo

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o arquivo `.env`** apontando para a API local (`http://localhost:3000`) ou de produção.

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. A aplicação estará disponível em `http://localhost:5173`.

---

## 🌐 Deploy em Produção

* **Front-end (Vercel):** `https://auction-frontend-sable.vercel.app`
* **Back-end (Render):** `https://auction-backend-indc.onrender.com`

> ⚠️ **Nota de Desempenho (Plano Gratuito do Render):** 
> Como o back-end está hospedado na camada gratuita do Render, a instância entra em modo de hibernação após períodos de inatividade. Por esse motivo, **a primeira requisição à API pode levar entre 30 e 60 segundos** para "acordar" o servidor. As requisições subsequentes responderão em tempo real e com velocidade normal.

---

## 🔑 Credenciais para Teste Rápido em Produção (Dados Semeados)

Para avaliar o sistema sem a necessidade de criar novas contas e lotes do zero, utilize os acessos pré-cadastrados abaixo:

### 1. Leiloeiro
* **E-mail:** leiloeiro@email.com
* **Senha:** Leiloeiro123!
* **Papel:** Gestão e criação de leilões/lotes.

### 2. Licitante 1 (Comprador 1)
* **Nome:** Comprador Um
* **E-mail:** licitante1@email.com
* **Senha:** Licitante123!

### 3. Licitante 2 (Comprador 2)
* **Nome:** Comprador Dois
* **E-mail:** licitante2@email.com
* **Senha:** Licitante223!

### 4. Lote Ativo no Ar
* **Item:** iPhone X
* **Status:** Lances Abertos
* **Valor Inicial:** R$ 899,99

