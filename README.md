# 🏢 **Central Cefrio**

**Central Cefrio** é uma plataforma desenvolvida para centralizar todos os aplicativos da empresa em um único lugar, promovendo eficiência, organização e acessibilidade. O projeto, atualmente em fase inicial, contém dois módulos principais: **Comercial** e **Emails**.

---

## 🚀 **Módulos Disponíveis**

### 📊 **Comercial**

Gerenciamento comercial e faturação:

- Emissão e organização de faturas.
- Relatórios e análises de desempenho comercial.

### 📧 **Emails**

Gestão de correio eletrônico:

- Caixa de entrada e saída de e-mails.
- Composição e envio eficiente de mensagens.

---

## 🛠️ **Tecnologias Utilizadas**

- **Next.js 14**: Framework React para aplicações full-stack com recursos avançados de SSR, API Routes e App Router.
- **Prisma ORM**: Gerenciamento eficiente e tipado do banco de dados.
- **Node.js**: Plataforma para execução do backend.
- **Typescript**: Tipagem estática para maior robustez do código.
- **TailwindCSS**: Para estilização rápida e moderna.

---

## ⚙️ **Instalação e Configuração**

### 1. **Pré-requisitos**

Certifique-se de ter instalado em sua máquina:

- **Node.js** (v20+)
- **NPM**
- **PostgreSQL** ou outro banco de dados compatível com Prisma

### 2. **Clonar o Repositório**

```bash
git clone https://github.com/PEAL-26/central-cefrio.git
cd central-cefrio
```

### 3. **Instalar Dependências**

```bash
npm install
```

### 4. **Configurar Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NODE_ENV=development
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_NUMBER_VALIDATION=
DATABASE_URL="postgres://user:password@host:port/database?schema=public"
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="YOUR_SECRET"
```

#### 4.1. **Configurar Variáveis de Ambiente para Upload de Arquivos**

```env
VERCER_STORE_READ_WRITE_TOKEN=""
NEXT_PUBLIC_UPLOAD_LOCAL=true
UPLOAD_FILE_PROTOCOL=""
UPLOAD_FILE_HOSTNAME=""
```

#### 4.2. **Configurar Variáveis de Ambiente para Sentry (logs de erro)**

```env
SENTRY_ENABLE="false"
SENTRY_AUTH_TOKEN=""
SENTRY_ORGANIZATION=""
SENTRY_PROJECT=""
```

### 5. **Executar Migrações do Prisma**

```bash
npx prisma migrate dev
```

### 6. **Rodar o Projeto em Desenvolvimento**

```bash
npm run dev
```

O projeto estará disponível em **http://localhost:3001**.

---

## 👨‍💻 **Contribuição**

Sinta-se à vontade para contribuir com o projeto! Para isso:

1. Faça um fork do repositório.
2. Crie uma branch com suas alterações:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie suas alterações:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request 🚀.

---

## 📜 **Licença**

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 💬 **Contato**

Para dúvidas, sugestões ou parcerias, entre em contato:

- **Nome do Desenvolvedor**: _Seu Nome_
- **E-mail**: [edilasio@live.com](mailto:edilasio@live.com)
- **LinkedIn**: [PEAL](https://www.linkedin.com/in/peal26/)

---

**Desenvolvido com ❤️ e dedicação.** 🚀
