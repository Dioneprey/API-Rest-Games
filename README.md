# API Rest Games - NodeJS

## Endpoints
### GET /games 
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parâmetros 
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.
Exemplo de resposta:
```
[
    {
        "id": 1,
        "title": "Elden Ring",
        "year": 2022,
        "price": 60
    },
    {
        "id": 2,
        "title": "Dark souls 3",
        "year": 2016,
        "price": 50
    },
    {
        "id": 3,
        "title": "Mass Effect",
        "year": 2007,
        "price": 25
    }
]
```
#### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.
Exemplo de resposta:
```
{
    "err": "Token inválido"
}
```
### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parâmetros 
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:
```
{             
        "email": "admin@gmail.com",
        "password": "senha"    
}
```
#### Respostas
#### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação. Motivos: Email ou senha inválido.
Exemplo de resposta:
```
{
    "error": "Credenciais inválidas"
}
```
##### OK! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar os Endpoints.
Exemplo de resposta:
```
{
    "token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NzMwOTg1MzAsImV4cCI6MTY3MzE4NDkzMH0.uRjYT34HNg254V0fqFUXsyXYSysproNEKCALPr4EBLI"
}
```
### POST /game
Esse endpoint é responsável por cadastrar um jogo no sistema.
#### Parâmetros 
title: Título do jogo

price: Preço do jogo

year: Ano de lançamento do jogo

Exemplo:
```
{             
        "title": "Sekiro",
        "price": "50",
        "year": "2019"    
}
```
#### Respostas
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.
Exemplo de resposta:
```
{
    "err": "Token inválido"
}
```
##### OK! 200
Caso essa resposta aconteça, isso significa que o cadastro do jogo foi concluído com sucesso.
### PUT /game/:id
Esse endpoint é responsável por atualizar um jogo no sistema.
#### Parâmetros
Possível ignorar os parâmetros onde não sofrerá alterações.
title: Título do jogo

price: Preço do jogo

year: Ano de lançamento do jogo<br>
Exemplo utilizando o Postman:
```
PUT http://localhost:8080/game/8
{             
        "title": "Terraria",
        "price": "10",
        "year": "2011"    
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça o jogo foi alterado com sucesso.
#### Not Found! 404
Caso essa resposta aconteça, significa que não foi encontrado o ID especificado.
### DELETE /game/:id
Esse endpoint é responsável por deletar um jogo do sistema.
#### Parâmetros 
ID: ID de um jogo específico 
Exemplo utilizando o Postman:
```
DELETE http://localhost:8080/game/8
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça, isso signifca que o jogo foi deletado com sucesso.
##### Bad Request! 404
Caso essa resposta aconteça, isso significa que não foi encontrado um jogo com o ID especificado.
