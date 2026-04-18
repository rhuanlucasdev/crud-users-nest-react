# 🚀 CRUD Users - Nest.js + React

Fullstack CRUD application with advanced features using **NestJS**, **React**, **Material UI** and **PostgreSQL**.

## ✨ Features

- ✅ **CRUD Completo** - Create, Read, Update, Delete com Material UI
- ✅ **Busca Dinâmica** - Filtro por nome (case-insensitive) em tempo real
- ✅ **Paginação** - Exibição de 10 ou 20 usuários por página
- ✅ **Toast Notifications** - Mensagens de sucesso/erro com cores customizadas
- ✅ **Modal de Confirmação** - Dialog antes de deletar usuário
- ✅ **Ordenação Automática** - Usuários sempre ordenados por ID crescente
- ✅ **Design Responsivo** - Mobile first com Sass e design tokens
- ✅ **Backend Robusto** - NestJS com Prisma ORM
- ✅ **Database em Docker** - PostgreSQL containerizado com Docker Compose

---

## 🛠️ Stack Técnico

### Backend

- **NestJS** - Framework Node.js moderno
- **Prisma** - ORM type-safe
- **PostgreSQL** - Banco de dados
- **ESLint** - Linting

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Material UI (MUI)** - Component library
- **Vite** - Build tool rápido
- **Sass/SCSS** - Styling com design tokens

### Infrastructure

- **Docker** - Containerização do banco
- **Docker Compose** - Orquestração de serviços

---

## 📋 Requisitos

Antes de começar, você precisará ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Docker** e **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/))

---

## 🚀 Quickstart

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/crud-users-nest-react.git
cd crud-users-nest-react
```

### 2️⃣ Subir o Banco de Dados

```bash
# Subir PostgreSQL em Docker
docker-compose up -d

# Verificar se está rodando
docker ps
```

✅ PostgreSQL estará disponível em `localhost:5433`

### 3️⃣ Setup Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente (se necessário)
# O banco já está pré-configurado em docker-compose.yml

# Executar migrations do Prisma
npx prisma migrate dev

# Iniciar servidor
npm run start:dev
```

Backend rodará em `http://localhost:3000`

### 4️⃣ Setup Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Frontend estará em `http://localhost:5173` (ou outra porta indicada)

---

## 🔌 Variáveis de Ambiente

### Backend (`.env` na pasta `backend/`)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/cruddb
```

### Frontend

Não requer variáveis para desenvolvimento local.

---

## 📊 API Endpoints

Base URL: `http://localhost:3000`

### Usuários

- `GET /users` - Listar usuarios (com filtro opcional)
- `GET /users?name=João` - Buscar por nome
- `POST /users` - Criar usuário
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

**Exemplo de Request:**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@example.com"}'
```

---

## 🐳 Docker Compose

### Iniciar

```bash
docker-compose up -d
```

### Parar

```bash
docker-compose down
```

### Limpar dados (remover volumes)

```bash
docker-compose down -v
```

### Ver logs

```bash
docker-compose logs -f postgres
```

### Acessar o banco

```bash
docker-compose exec postgres psql -U postgres -d cruddb
```

### Fazer backup

```bash
docker-compose exec postgres pg_dump -U postgres cruddb > backup.sql
```

---

## 📝 Estrutura do Projeto

```
crud-users-nest-react/
├── backend/
│   ├── src/
│   │   ├── users/          # Módulo de usuários
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── entities/   # Entities
│   │   │   ├── users.controller.ts
│   │   │   └── users.service.ts
│   │   ├── prisma/         # Configuração Prisma
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma   # Schema do database
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Componente principal
│   │   ├── main.tsx        # Entry point
│   │   ├── styles/         # Global styles (SCSS)
│   │   └── services/       # API calls
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── docker-compose.yml      # Orquestração Docker
├── README.md               # Este arquivo
└── .gitignore
```

---

## 🎨 Design System

### Cores (Tokens)

- **Primary (Azul):** `#4f8cff`
- **Success (Verde):** `#22c55e`
- **Error (Vermelho):** `#ef4444`
- **Background (Escuro):** `#071426`
- **Surface:** `#0f1f37`
- **Text (Branco):** `#ffffff`

### Componentes UI

- **Inputs, Buttons, Tables** - Material UI
- **Toasts** - Material UI Snackbar + Alert
- **Dialogs** - Material UI Dialog
- **Estilos globais** - SCSS com design tokens

---

## 🧪 Dados de Teste

Para popular o banco com dados de teste, execute:

```bash
for user in '{"name":"João Silva","email":"joao.silva@example.com"}' '{"name":"Maria Santos","email":"maria.santos@example.com"}' '{"name":"Carlos Oliveira","email":"carlos.oliveira@example.com"}' '{"name":"Ana Costa","email":"ana.costa@example.com"}' '{"name":"Pedro Martins","email":"pedro.martins@example.com"}' '{"name":"Lucia Rocha","email":"lucia.rocha@example.com"}' '{"name":"Ricardo Gomes","email":"ricardo.gomes@example.com"}' '{"name":"Fernanda Lima","email":"fernanda.lima@example.com"}' '{"name":"Bruno Souza","email":"bruno.souza@example.com"}' '{"name":"Patricia Alves","email":"patricia.alves@example.com"}' '{"name":"Diego Ferreira","email":"diego.ferreira@example.com"}' '{"name":"Amanda Ribeiro","email":"amanda.ribeiro@example.com"}' '{"name":"Felipe Mendes","email":"felipe.mendes@example.com"}' '{"name":"Gabriela Barbosa","email":"gabriela.barbosa@example.com"}' '{"name":"Leonardo Castro","email":"leonardo.castro@example.com"}'; do curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "$user" -s && sleep 0.3; done
```

---

## 🔧 Troubleshooting

### Erro: "Porta 5433 já em uso"

```bash
# Encontrar processo na porta
lsof -i :5433

# Matar processo (se necessário)
kill -9 <PID>
```

### Erro: "Could not connect to database"

```bash
# Verificar status do container
docker-compose ps

# Verificar logs
docker-compose logs postgres

# Reiniciar
docker-compose restart postgres
```

### Erro: "EADDRINUSE 3000" (Backend)

O port 3000 já está em uso. Mude a porta ou mate o processo.

### Erro ao fazer migrations

```bash
# Resetar banco (CUIDADO: deleta tudo)
npx prisma migrate reset

# Depois fazer migrate dev novamente
npx prisma migrate dev
```

---

## 📚 Scripts Úteis

### Backend

```bash
npm run start:dev     # Desenvolvimento com hot-reload
npm run build         # Build produção
npm run start         # Iniciar versão compilada
npm test             # Rodar testes
```

### Frontend

```bash
npm run dev           # Desenvolvimento
npm run build         # Build produção
npm run preview       # Preview do build
npm run lint          # Rodar linter
```

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/MinhaFeature`
2. Commit suas mudanças: `git commit -m "feat: descrição da feature"`
3. Push para branch: `git push origin feature/MinhaFeature`
4. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob licença MIT.

---

## 👥 Autores

Desenvolvido com ❤️ por [@seu-usuario](https://github.com/seu-usuario)

---

## 📞 Suporte

Encontrou um bug? Abra uma issue no GitHub! 🐛
