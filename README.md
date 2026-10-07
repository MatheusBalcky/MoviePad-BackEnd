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

Use Node.js 24 LTS (24.15.0 ou superior), npm 12.2.0 e PostgreSQL. As dependências foram atualizadas em 7 de outubro de 2026. O TypeScript permanece em 6.0.3 por compatibilidade com typescript-eslint; versões de pré-lançamento não foram adotadas. O Jest usa Babel 7.29.7, compatível com seus presets atuais.

O `package.json` registra permissões de instalação para versões específicas das dependências que geram clientes ou carregam componentes nativos. Os `overrides` atualizam dependências transitivas vulneráveis do Prisma e da cobertura de testes, além do `glob` obsoleto. Ao atualizar essas versões, revise as permissões e valide novamente instalação, migrações, testes e cobertura.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/MatheusBalcky/MoviePad-BackEnd.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm ci
```

Copie `.env.example` para `.env` e configure `PORT`, `JWT_SECRET` e `DATABASE_URL`. Use um segredo JWT privado e uma URL PostgreSQL válida. O cliente Prisma é gerado automaticamente na instalação; para regenerá-lo, use `npm run prisma:generate`.

Aplique as migrações existentes ao banco configurado:

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

Antes dos testes, crie `.env.test` com `DATABASE_URL` apontando para um banco PostgreSQL separado e aplique as mesmas migrações a esse banco. O teste executa `TRUNCATE users CASCADE`; nunca use o banco de desenvolvimento ou produção. O Jest transforma TypeScript e o Faker ESM com Babel, sem módulos VM experimentais. Para gerar cobertura, execute `npm test -- --runInBand --coverage`. Para verificar vulnerabilidades, execute `npm audit`.
