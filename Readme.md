# Criar um projeto node
    1.0 - Instalar o express
    2.0 - Instalar o nodemon em ambiente de Desenvolvimendo (-D)
    3.0 - criar script no package.json para rodar o server no nodemon
        "main": "src/index.js" // mostra que o arquivo principal está na pasta src/index.js
        "scripts": {
            "dev": "nodemon" // rodar o arquivo main com o nodemon
        }

        >yarn dev // rodar o servidor
    
# Conceitos
    ## API Rest
        - Fluxo da requisição e resposta:
        - Requisição feita por um cliente;
        - Resposta retornada através de uma estrutura de dados;
        - Cliente recebe resposta e processa o resultado;

        - Ao invés de o backend retornar o full html  ele vai retornar apenas a estrutura de dados e o frontend se preocupa de como vai mostrar esses dados;

    ### Metodos:
        - GET (pegar informação)
        - POST (adicionar/criar informação)
        - PUT/PATCH (alterar informação)
        - DELETE (deletar informação)

    ### Benefícios:
        1. Multiplos clientes (front-end), mesmo backend;
        2. Protocolo de comunicação padronizado (JSON)

    ### Conteudo de requisições:
        - GET http://api.com/company/1/users?page=2
            1. company = Route
            2. /1 = Route Params
            3. /users = Route
            4. ?page=2 = Query Params

        - POST  http://api.com/company/1/users

            acompanhado de um BODY na estrutura JSON

            {

            "user"{

            ....

            }

            }

            Body (Apenas POST/PUT) pois a informação não é visivel

            Headers = envia informações como autenticação, não faz diferença no resultado final é apenas para enviar informações adicionais ex:

            {

            "Locale": "pt_BR" // saber onde o usuario está

            }

    ### HTTP codes
        1. 1xx: Informational;
        2. 2xx: Success
            1. 200: success
            2. 201: created
        3. 3xx: Redirection
            1. 301: moved permanently
            2. 302: moved
        4. 4xx: Client Error
            1. 400: Bad Request
            2. 401: Unauthorized
            3. 404: not found
        5. 5xx: Server Error
            1. 500: Internal server error

    ### Middleware

        Interceptador de requisições que interrompem totalmente a requisição ou pode alterar os dados