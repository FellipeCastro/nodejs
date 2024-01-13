const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const Sequelize = require("sequelize")

// Config  
    // Tamplate Engine
        app.engine("handlebars", handlebars({
            defaultLayout: "main",
            layoutsDir: __dirname + "/views/layouts" 
        }));
        app.set("view engine", "handlebars")
    // Conexão com o banco de dados MySQL        
        const sequelize = new Sequelize("teste", "root", "Fsc#1531", {
            host: "localhost",
            dialect: "mysql"
        })
// Rotas
    app.get("/cad", (req, res) => {
        res.render("formulario")
    })

app.listen(8081, () => {
    console.log("Servidor rodando")
}) // Ultima linha do código