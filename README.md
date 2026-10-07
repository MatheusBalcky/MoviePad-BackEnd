# <p align = "center"> MoviePad Back-End </p>


## :clipboard: Descrição 

"MoviePad" Um sistema criado para gerenciar as requisições da aplicação [MoviePad-FrontEnd](https://github.com/MatheusBalcky/MoviePad-Front-end). Usando como banco o postgres. A aplicação consiste em criar listas personalizadas de filmes e séries que o usuário deseja guardar em suas listas. E também com um sistema de login e registro de usuário.

##	:computer: Tecnologias e Conceitos

- REST APIs
- JWT
- Node.js
- TypeScript
- Prisma
- Postgres
- Jest (QA)

***

## :rocket: Rotas

```yml
POST /signup
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum",
        "passwordConfirm": "loremipsum"
      }
```
    
```yml 
POST /signin
    - Rota para fazer login
    - headers: {}
    - body: {
      "email": "lorem@gmail.com",
      "password": "loremipsum"
    }
```
    
```yml 
GET /lists (autenticada)
    - Rota que retorna todas as listas do usuário
    - headers: { "Authorization": "Bearer <token>" }
    - body: {}
```

```yml
POST /lists/create (autenticada)
    - Rota para criar uma nova lista
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "teste",
        "iconList": "🍉"
    }
``` 

```yml
POST /lists/:listId/addcontent (autenticada)
    - Rota para adicionar conteúdo a uma lista
    - headers: { "Authorization": "Bearer $token" }
    - body: {
      contentId: 'ContentApiID' ,
      title: 'ContentTitle',
      pictureUrl: 'https://.....jpg',
      description: 'Lorem...',
      releaseYear: '0000-00-00',
      trailerUrl: '',
      rating: '8.0'
    }
```

***

## 🏁 Rodando a aplicação

Use Node.js 24 LTS (24.15.0 ou superior), npm 12.2.0 e PostgreSQL. As dependências foram atualizadas em 7 de outubro de 2026. O TypeScript permanece em 6.0.3 por compatibilidade com typescript-eslint. O Prisma foi migrado integralmente para a versão 8 em pré-lançamento: CLI `8.0.0-rc.21` e ORM PostgreSQL `8.0.0-rc.16`, nas versões publicadas compatíveis entre si. O Jest usa Babel 7.29.7, compatível com seus presets atuais.

O `package.json` registra permissões de instalação para versões específicas das dependências que geram clientes ou carregam componentes nativos. Os `overrides` atualizam dependências transitivas vulneráveis do Prisma e da cobertura de testes, além do `glob` obsoleto. Ao atualizar essas versões, revise as permissões e valide novamente instalação, migrações, testes e cobertura.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/MatheusBalcky/MoviePad-BackEnd.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm ci
```

Copie `.env.example` para `.env` e configure `PORT`, `JWT_SECRET` e `DATABASE_URL`. Use um segredo JWT privado e uma URL PostgreSQL válida. O contrato nativo Prisma 8 está em `prisma/schema.prisma`. Os tipos e o contrato JSON são gerados automaticamente na instalação em `src/database/generated`; para regenerá-lo, use `npm run prisma:generate`.

Para um banco existente que já recebeu todas as migrações do Prisma 7, faça backup e adote o contrato uma única vez, antes de iniciar a versão 8:

```sh
npm run prisma:adopt
```

Esse comando verifica o esquema e registra o contrato sem recriar tabelas ou apagar dados. Se a verificação falhar, corrija a divergência antes de prosseguir. Não execute a adoção para substituir a aplicação de futuras migrações.

Para um banco vazio, pule a adoção. Aplique as migrações do Prisma 8:

```
npm run prisma:deploy
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```

Para compilar e executar a versão compilada:

```sh
npm run build
npm start
```

Para verificar o código e executar o teste de integração:

```sh
npm run lint
npm test -- --runInBand
```

Antes dos testes, crie `.env.test` com `DATABASE_URL` apontando para um banco PostgreSQL separado e aplique as mesmas migrações a esse banco. Os testes executam `TRUNCATE users, "moviesTvshows" CASCADE`; nunca use o banco de desenvolvimento ou produção. O Jest transforma TypeScript e o Faker ESM com Babel, sem módulos VM experimentais. Para gerar cobertura, execute `npm test -- --runInBand --coverage`. Para verificar vulnerabilidades, execute `npm audit`.

As migrações Prisma 8 estão em `prisma/migrations-v8`: a migração inicial cria as mesmas quatro tabelas, índices e relações existentes. O histórico SQL do Prisma 7 foi preservado em `prisma/migrations` para consulta, mas não é executado pelo novo fluxo. O runtime usa `@prisma/orm-postgres`, sem `@prisma/client` nem adaptador Prisma 7. Os repositórios mantêm as respostas HTTP existentes, inclusive datas UTC, contagens e conflitos de conteúdo duplicado.

Para futuras alterações, trabalhe contra um banco de desenvolvimento atualizado, registre a referência local do estado atual **antes de editar o contrato**, depois gere e revise a migração:

```sh
npm run prisma:deploy
npm run prisma:adopt
# Edite prisma/schema.prisma.
npm run prisma:generate
npm run prisma:plan -- --name descricao_da_alteracao
# Revise os arquivos gerados antes de aplicar.
npm run prisma:deploy -- --advance-ref db
```

Versione o contrato e o grafo de migrações gerado; as referências locais e os artefatos de runtime são ignorados pelo Git. Para implantar, execute `npm ci`, `npm run build` e `npm start`, que aplica as migrações pendentes antes de subir o servidor.
