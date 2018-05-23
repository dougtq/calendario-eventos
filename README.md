# Calendário de Eventos TokenLab - Douglas Alves

Essas instruções vão deixar uma cópia funcional do projeto em sua máquina local.

## Pré-requisitos

* [MongoDB](https://www.mongodb.com/download-center?jmp=homepage#community)
* [Nodejs && NPM](https://nodejs.org/)
* [Docker](https://www.docker.com/get-docker) - **Apenas para produção (back-end)**
* [Compose](https://docs.docker.com/compose/install/#install-compose) - **Apenas para produção (back-end)**

Garanta que o serviço do banco de dados esteja ativo e disponível

## Clonando

Primeiro é necessário clonar o projeto:
```sh
git clone https://github.com/dougtq/calendario-eventos.git
```

E entre na pasta do projeto:
```sh
cd calendario-eventos
```

# Back-End
Entre na pasta do back-end:
```sh
 cd server-calendario
```

Instale as dependencias do projeto:

```js
npm install 
```

## Variáveis de ambiente (Env)
Renomeie o arquivo .env.example para .env assim:

```sh
mv .env.example .env
```
## Rodando o Back-End

Execute o comando
```js
npm run build:start //  ou => npm run dev
```

## Rodando testes

Use esse script para rodar os testes:
```sh
npm run test
```
Use esse script para testes contínuos:
```sh
npm run test:live
```

## Executar back-end com Docker

Inicie o projeto com docker-compose

**Certifique-se que as portas dos dois containers (banco e API) já não estão sendo usadas**

```sh
docker-compose up -d
```

# Front-End

Abra outra instância de terminal para o front-end

Entre na pasta do back-end:
```sh
cd calendario-eventos && cd calendario
```

Instale as dependencias do projeto:

```sh
npm install
```

Execute o comando

```sh
ng serve
```

## Documentação

Há uma documentação Swagger da API  no caminho [./server-calendario/docs/swagger](./server-calendario/docs/swagger/calendario.yaml) para ser importada no [Editor Swagger](https://editor.swagger.io/)

## Ferramentas usadas

* [Angular](https://angular.io/) - O framework usado no front-end

* [Express](http://www.expressjs.com/) - O framework usado para criação da API REST.

* [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL.

* [Mongoose](http://mongoosejs.com) - O modelador de objetos mongodb para o Node.

* [JWT](https://jwt.io/) - Uma maneira segura de transmitir mensagens.


## Criado por

* **[Douglas E. Alves](https://github.com/dougtq)**

## Licença

Esse projeto foi criado sob a licença MIT - veja [LICENÇA](LICENSE) para mais detalhes