const app = require('express')()
const bodyParser = require('body-parser')
const {v4} = require('uuid') // biblioteca para gerar um id
const {isUuid} = require('uuidv4')

app.use(bodyParser.json())

const projects = [];

// Interceptador de requisições que interrompem totalmente a requisição ou pode alterar os dados
function logRequest(request, response, next) {
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.log('1')
    console.time(logLabel)
    // se nao chamar o next ele vai interromper a requisição
    next(); //proximo middleware

    console.log('2')
    console.time(logLabel)
}

// * Formas de utilizar os middleware
// todas as rotas vao passar pelo logRequest ou pode passar individualmente em cada rota
app.use(logRequest)
// app.use('/projects/:id') // apenas nas rotas que tem /projects/:id

// o fluxo dos middleware vai ser '1'(middleware) -> '3'(funcao/rota) -> '2'(codigo depois do next)

function validateProjectId(request, response, next) {
    const {id} = request.params;

    if(!isUuid(id)) {
        return response.status(400).json({error: "invalid project id"})
    }

    return next()   
}

// acessar os projetos
app.get('/projects', (request, response) => {
    console.log('3')

    const {title} = request.query

    // filtrar pelo titulo caso mando o parametro na query
    const results = title 
        ? projects.filter(project => project.title === title)
        : projects;

    return response.json(results)
})

// criar projeto
app.post('/projects', (request, response) => {
    const {title, owner} = request.body

    const project = {id: v4(), title, owner}

    projects.push(project)

    // retornar o projeto criado
    return response.json(project)
})

// atualizar projeto
app.put('/projects/:id', validateProjectId,(request, response) => {
    const {id} = request.params
    const {title, owner} = request.body

    // encontra o index do projeto (posicao)
    const projectIndex = projects.findIndex( project => project.id === id)

    // se nao encontrar vai retornar -1
    if( projectIndex < 0 ) {
        return response.status(404).json({error: "Project not found"})
    }

    const project = {id, title, owner};

    // atualizar dados do index
    projects[projectIndex] = project;

    return response.json(project)
})

// deletar projeto
app.delete('/projects/:id', validateProjectId,(request, response) => {
    const {id} = request.params
    
    // encontra o index do projeto (posicao)
    const projectIndex = projects.findIndex( project => project.id === id)

    // se nao encontrar vai retornar -1
    if( projectIndex < 0 ) {
        return response.status(404).json({error: "Project not found"})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
})


app.listen(8080, () => {
    console.log('listening on port 8080')
})