const express = require('express')
const server = express() // Ou seja, estou executando a função express no server que no final das contas será um objeto de servidor para eu poder usar várias coisas

// Importando o banco de dados
const db = require("./database/db") // Posso colocar db ou db.js

// Configurando a pasta publica (PASTA QUE FICARÁ DISPONÍVEL PARA SER ACESSADA NO MEU WEBSITE) para fazer com que o express enchergue a pasta public e tudo que estiver lá dentro
server.use(express.static("public")) // A função static recebe uma pasta (que neste caso é a public) e deixa todo seu conteúdo disponível

// Habilitando o uso do req.body na nossa aplicação
server.use(express.urlencoded( { extended: true }))

// Utilizando TEMPLATE ENGINE com o NUNJUCKS
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', { // O 1º parâmetro diz em qual pasta vai estar os meus html's
    express: server,
    noCache: true
})







// Renderizando as páginas
server.get('/', (req, res) => { // O 1º parâmetro é a rota, exemplo: localhost:3000/
    // res.send('Cheguei aqui')
    // res.sendFile(__dirname + '/views/index.html') // __dirname indica o diretório atual, ou seja, o diretório em que estou. Neste exemplo é 'src'
    // return res.render('index.html') // Como ja está configurado que o render (nunjucks) vai ter a pasta src/views não é preciso usar o __dirname nem a pasta views
    return res.render('index.html', { title: 'Um título' }) // O 2º param é um objeto que recebe as variáveis passando seus valores
})





server.get('/create-point', (req, res) => { // res --> envia uma resposta | req --> recebe uma resposta de um formulário | req = Pedido | res = Resposta

    // req.query: Query Strings da url
    // console.log(req.query)

    // res.send('Cheguei aqui')
    // res.sendFile(__dirname + '/views/create-point.html') // __dirname indica o diretório atual, ou seja, o diretório em que estou. Neste exemplo é 'src'
    return res.render('create-point.html') // Como ja está configurado que o render (nunjucks) vai ter a pasta src/views não é preciso usar o __dirname nem a pasta views
})

server.post('/savepoint', (req, res) => { // O nome da rota ('/create-point') é o mesmo caso eu queira que fique na mesma rota

    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    // Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [ // No array eu adiciono os valores das ? da tabela places
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err) // return serve para finalizar o if e o console.log serve para 'imprimir' o erro
            return res.send('Erro no cadastro!')
        }

        console.log('Cadastado com sucesso')
        console.log(this) // This está referenciando a resposta que o run está trazendo | OBSERVAÇÂO: this não pode ser usado em arrow function

        return res.render('create-point.html', { saved: true })
    }

    db.run(query, values, afterInsertData)
})





server.get('/search', (req, res) => { // get 'recebe uma página' | req = requisição = pedido | O 1º parâmetro é a rota, exemplo: localhost:3000/search
    // res.sendFile(__dirname + '/views/search-results.html')

    const search = req.query.search
    if (search == "") {
        return res.render('search-results.html', { total: 0 })
    }

    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) { // rows serão os registros da tabela
        if (err) {
            return console.log(err) // return serve para finalizar o if e o console.log serve para 'imprimir' o erro
        }

        // Pegando o total de pontos encontrados
        const total = rows.length

        // Mostrar a página html com os dados do banco de dados
        return res.render('search-results.html', { places: rows, total: total }) // Quando a propriedade e o valor possuem o mesmo nome 'total: total' é possível definir de uma maneira mais curta 'total'
    })
})



/*
// Configurar caminhos da minha aplicação:

// Página Inicial
server.get('/', (req, res) => {
    // res.send('Cheguei aqui')
    res.sendFile(__dirname + '/views/index.html') // __dirname indica o diretório atual, ou seja, o diretório em que estou. Neste exemplo é 'src'
})

// Create Point
server.get('/create-point', (req, res) => { // get 'recebe uma página' | req = requisição = pedido
    // res.send('Cheguei aqui')
    res.sendFile(__dirname + '/views/create-point.html') // __dirname indica o diretório atual, ou seja, o diretório em que estou. Neste exemplo é 'src'
})
*/

// Ligar o server (servidor)
server.listen(3000)