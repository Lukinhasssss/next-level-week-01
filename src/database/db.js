const sqlite3 = require("sqlite3").verbose() // verbose somente indica que eu vou querer ver mensagens no terminal

// Criando o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Exportando o arquivo db.js
module.exports = db

// Utilizando o objeto de banco de dados para as operações
// db.serialize(() => { // serialize só indica que ele vai querer rodar uma sequência de códigos

//     // Criando uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)


//     // Inserindo dados na tabela
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `

//     const values = [ // No array eu adiciono os valores das ? da tabela places
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err) // return serve para finalizar o if e o console.log serve para 'imprimir' o erro
//         }

//         console.log('Cadastado com sucesso')
//         console.log(this) // This está referenciando a resposta que o run está trazendo | OBSERVAÇÂO: this não pode ser usado em arrow function
//     }

//     db.run(query, values, afterInsertData) //Comentei essa linha depois de inserir os dados para não inserir dados novamente


//     // Consultando dados da tabela
//     // db.all(`SELECT name FROM places`, function(err, rows) { // rows serão os registros da tabela
//     //     if (err) {
//     //         return console.log(err) // return serve para finalizar o if e o console.log serve para 'imprimir' o erro
//     //     }

//     //     console.log('Aqui estão seus registros: ')
//     //     console.log(rows)
//     // })


//     // Deletando um dado da tabela
//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) { // function do tipo callback que será chamada depois que deletar
//     //     if (err) {
//     //         return console.log(err) // return serve para finalizar o if e o console.log serve para 'imprimir' o erro
//     //     }

//     //     console.log('Registro deletado com sucesso!')
//     // })
// })