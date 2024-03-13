// Carregando Módulos
const express = require("express")
const exphbs = require("express-handlebars")
const handlebars = exphbs.create({})
const bodyParser = require("body-parser")
const app = express()
// const mongoose = require("mongoose")

// Configurações
    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app. use(bodyParser.json())
    // Handlebars
    app.engine('handlebars', handlebars.engine)
    app.set('view engine', 'handlebars')
    // Mongoose

// Rotas


// Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando")
})