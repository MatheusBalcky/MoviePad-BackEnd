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

Este projeto foi inicializado com o Node.Js e com o gerenciador de bibliotecas NPM, então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/MatheusBalcky/MoviePad-BackEnd.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Logo após faça as migrates do prisma para criar o banco da aplicação local (postgres).

```
npx migrate dev
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```
