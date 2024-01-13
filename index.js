const express = require("express")
const app = express()
const handlebars = require("express-handlebars")

// Config  
    // Tamplate Engine
        app.engine("handlebars", handlebars({defaultLayout: "main"}))
        app.set("view engine", "handlebars")
    // Conexão com o banco de dados MySQL
        const Sequelize = require("sequelize")
        const sequelize = new Sequelize("teste", "root", "Fsc#1531", {
            host: "localhost",
            dialect: "mysql"
        })


app.listen(8081, function() {
    console.log("Servidor rodando")
}) // Ultima linha do código