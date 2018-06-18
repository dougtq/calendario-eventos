# Calendário de Eventos

Essas instruções vão deixar uma cópia funcional do projeto em sua máquina local.

## Pré-requisitos

* [Git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)
* [MongoDB](https://www.mongodb.com/download-center?jmp=homepage#community)
* [Nodejs && NPM](https://nodejs.org/)
* [Docker](https://www.docker.com/get-docker) - **Apenas para produção (back-end)**
* [Compose](https://docs.docker.com/compose/install/#install-compose) - **Apenas para produção (back-end)**

Garanta que o serviço do banco de dados esteja ativo e disponível

## Clonando

Primeiro é necessário clonar o projeto:
```
$ git clone https://github.com/dougtq/calendario-eventos.git
```

E entre na pasta do projeto:
```sh
$ cd calendario-eventos
```

# Back-End
Entre na pasta do back-end:
```sh
$ cd server-calendario
```

Instale as dependencias do projeto:

```
$ npm install 
```

## Variáveis de ambiente (Env)
Renomeie o arquivo .env.example para .env assim:

```
$ mv .env.example .env
```
## Rodando o Back-End

Execute o comando
```js
$ npm run build:start //  ou => npm run dev
```

## Rodando testes

Use esse script para rodar os testes:
```
$ npm run test
```
Use esse script para testes contínuos:
```
$ npm run test:live
```


# Front-End

Abra outra instância de terminal para o front-end

Entre na pasta do front-end:
```sh
$ cd calendario-eventos && cd calendario
```

Instale as dependencias do projeto:

```
$ npm install
```

Execute o comando

```
$ ng serve
```

E então abra o projeto no seu navegador de preferência no link http://localhost:4200


## Documentação

Há uma documentação Swagger da API  no caminho [./server-calendario/docs/swagger](./server-calendario/docs/swagger/calendario.yaml) para ser importada no [Editor Swagger](https://editor.swagger.io/)


## Executar back-end com Docker

Inicie o projeto com docker-compose

**Certifique-se que as portas dos dois containers (banco e API) já não estão sendo usadas e altere a variável DB_HOST do arquivo .env para apontar para o container do banco: mongo**

```sh
docker-compose up -d
```

## Ferramentas usadas

* [Angular](https://angular.io/) - O framework usado no front-end

* [Express](http://www.expressjs.com/) - O framework usado para criação da API REST.

* [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL.

* [Mongoose](http://mongoosejs.com) - O modelador de objetos mongodb para o Node.

* [JWT](https://jwt.io/) - Uma maneira segura de transmitir mensagens.


## Criado por

* **[Douglas E. Alves](https://github.com/dougtq)**

## Licença

Esse projeto foi criado sob a licença MIT - veja a [LICENÇA](LICENSE) para mais detalhes
