const Sequelize = require("sequelize")
const sequelize = new Sequelize("teste", "root", "Fsc#1531", {
    host: "localhost",
    dialect: "mysql"
})

// Verificando se o servidor está funcionando
// sequelize.authenticate().then(() => console.log("Conectado com sucesso")).catch((erro) => console.log("Falha ao se conectar: " + erro))

// Models

// Postagem
const Postagem = sequelize.define("postagens", {
    titulo: {
        type: Sequelize.STRING // string: limite de tamanho
    },
    conteudo: {
        type: Sequelize.TEXT // text: tamanho ilimitado
    }
})

// Postagem.sync({force: true}) // Sincronizar modulos ao MySQL

// Postagem.create({
//     titulo: "Titulo",
//     conteudo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, sed. Suscipit, totam. Repudiandae quas recusandae eum veniam reprehenderit facere, atque fuga sunt, ratione eligendi et. Soluta atque tempore culpa iure."
// })

// Usuários
const Usuario = sequelize.define("usuarios", {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

// Usuario.sync({force: true}) // Utilizar uma vez e comentar para a tabela não ser recriada

Usuario.create({
    nome: "Fellipe",
    sobrenome: "Castro",
    idade: 16,
    email: "fellipecastro@email.com"
})