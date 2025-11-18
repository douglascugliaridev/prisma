# ORM Prisma – Cadastro de Usuários (CLI)

Aplicação de linha de comando (CLI) em Node.js/TypeScript que demonstra o uso do ORM **Prisma** com **SQLite** para realizar operações de **CRUD de usuários**.  
O projeto possui:

- **Menu interativo no terminal** usando `terminal-kit`.
- Módulo de **cadastro de usuários** com:
  - Criação, listagem, busca por ID, alteração e exclusão.
  - Criptografia de senha com `bcrypt`.
- Exemplos básicos de uso do Prisma na pasta `src/basicos`.

---

## Tecnologias utilizadas

- **Node.js**
- **TypeScript**
- **Prisma ORM** (`@prisma/client` e `prisma`)
- **SQLite** (banco local)
- **dotenv** (variáveis de ambiente)
- **terminal-kit** (UI no terminal)
- **bcrypt** (hash de senha)
- **tsx** (execução de TypeScript no modo dev)

---

## Estrutura do projeto

Principais arquivos e pastas:

- `package.json`  
  Scripts e dependências do projeto.

- `prisma/`
  - `schema.prisma`  
    Define o modelo `Usuario`:
    - `id` (Int, autoincrement, chave primária)
    - `nome` (String)
    - `email` (String, único)
    - `senha` (String)
    - `ativo` (Boolean, padrão `true`)
    - Mapeado para a tabela `usuarios`.
  - `dev.db`  
    Banco de dados SQLite usado em desenvolvimento.
  - `migrations/`  
    Migrações geradas pelo Prisma.

- `prisma.config.ts`  
  Configuração do Prisma (schema, path de migrações, engine, e `DATABASE_URL` via `.env`).

- `src/`
  - `index.ts`  
    Ponto de entrada da aplicação. Chama `menuPrincipal()`.

  - `app/`
    - `menu-principal.ts`  
      Exibe o menu principal:
      - `Cadastro de Usuários`
      - `Sair`
      Encaminha para o menu de usuário e controla o loop da aplicação.
    - `ui/terminal.ts`  
      Classe utilitária `Terminal` com:
      - Limpar tela
      - Exibir título
      - Menus de seleção
      - Entrada de texto obrigatória
      - Pergunta Sim/Não
      - Exibição de tabela no terminal

    - `usuario/`
      - `model/usuario.ts`  
        Entidade/DTO de usuário.
      - `infra/`
        - `repositorio-usuario.ts`  
          Implementa o acesso ao banco usando Prisma (CRUD de usuários).
        - `provedor-criptografia.ts`  
          Implementa a criptografia de senha usando `bcrypt`.
      - `ui/`
        Telas/fluxos para:
        - `menu-usuario.ts`  
          Menu específico de usuários (listar, criar, alterar, excluir, etc).
        - `novo-usuario.ts`
        - `listar-usuario.ts`
        - `obter-usuario.ts`
        - `alterar-usuario.ts`
        - `excluir-usuario.ts`

  - `basicos/`  
    Scripts simples demonstrando operações com Prisma:
    - `usuario-inserir.ts` – cria um usuário.
    - `usuario-consultar-todos.ts` – lista todos os usuários.
    - `usuario-consultar-id.ts` – obtém usuário por ID.
    - `usuario-consultar-ativos.ts` – filtra usuários ativos.
    - `usuario-consultar-omitir-colunas.ts` – exemplo de seleção de campos.
    - `usuario-alterar.ts` – atualiza registros.
    - `usuario-deletar.ts` – exclui registros.
    - `usuario-salvar.ts` – exemplo mais completo de salvar/atualizar.

---

## Pré-requisitos

- **Node.js** (versão recomendada: 18+)
- **npm** (ou outro gerenciador, como `pnpm`/`yarn`)
- Ambiente capaz de executar **TypeScript** via `tsx` (já está nas `devDependencies`).

---

## Instalação

1. Clone o repositório (ou baixe os arquivos):
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd ORM-Prisma
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

---

## Configuração do banco de dados

O projeto utiliza **SQLite** e lê a string de conexão da variável de ambiente `DATABASE_URL`.

1. Crie um arquivo `.env` na raiz do projeto (se ainda não existir), por exemplo:

   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```

2. Garanta que o schema e as migrações estão aplicados:

   > Obs.: O `package.json` ainda não define scripts Prisma explícitos, mas você pode executar via `npx`:

   ```bash
   npx prisma migrate dev
   # ou, para gerar apenas o cliente:
   npx prisma generate
   ```

O arquivo `prisma.config.ts` já aponta para `prisma/schema.prisma` e diretório `prisma/migrations`.

---

## Scripts disponíveis

No `package.json`:

- `npm run dev`  
  Inicia a aplicação CLI em modo desenvolvimento:

  ```bash
  npm run dev
  ```

  Isso executa o arquivo `src/index.ts` com `tsx`, abrindo o menu principal no terminal.

---

## Uso da aplicação (CLI)

1. Com as dependências instaladas e o `.env` configurado, execute:

   ```bash
   npm run dev
   ```

2. No terminal, você verá o **Menu Principal**:

   - `Cadastro de Usuários`
   - `Sair`

3. A opção `Cadastro de Usuários` abre o **menu de usuário**, onde é possível:

   - Cadastrar novo usuário
   - Listar usuários
   - Buscar usuário por ID
   - Alterar dados de usuário
   - Excluir usuário
   - Ativar/desativar (se implementado no menu)

4. A navegação é feita usando as setas do teclado e **Enter**, através dos componentes de `terminal-kit`.

5. As ações realizadas pelo menu chamam o **repositório Prisma** para executar as operações no banco SQLite, utilizando o modelo `Usuario`.

---

## Exemplos básicos com Prisma (`src/basicos`)

Além da aplicação CLI, o projeto traz scripts de exemplo para estudar o Prisma de forma isolada:

- `usuario-inserir.ts`  
  Cria um novo usuário com dados fixos.

- `usuario-consultar-todos.ts`  
  Lista todos os registros da tabela `usuarios`.

- `usuario-consultar-id.ts`  
  Demonstra como buscar um usuário por `id`.

- `usuario-consultar-ativos.ts`  
  Mostra como aplicar filtros (WHERE) para retornar apenas usuários ativos.

- `usuario-consultar-omitir-colunas.ts`  
  Exemplo de seleção parcial de colunas (omitindo alguns campos).

- `usuario-alterar.ts`  
  Atualiza dados de um usuário existente.

- `usuario-deletar.ts`  
  Remove usuário(s) do banco.

- `usuario-salvar.ts`  
  Exemplo mais elaborado de inserção/atualização usando Prisma.

Você pode executar esses arquivos com `tsx` (ajustando o script ou via linha de comando), por exemplo:

```bash
npx tsx src/basicos/usuario-inserir.ts
```

---

## Boas práticas demonstradas

- Separação de camadas:
  - **model** (entidades/DTOs),
  - **infra** (acesso a dados e criptografia),
  - **ui** (interações via terminal).
- Uso de **variáveis de ambiente** para a URL do banco.
- Uso de **hash de senhas** com `bcrypt`, evitando armazenar senhas em texto puro.
- Demonstração de **migrações** e **modelo Prisma** em projeto real.

---

