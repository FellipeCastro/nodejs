const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

// Config  
    // Tamplate Engine
        app.engine("handlebars", handlebars({ defaultLayout: "main" }))
        app.set("view engine", "handlebars")
    
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
// Rotas
    app.get("/cad", (req, res) => {
        res.render("formulario")
    })
    app.post("/add", (req, res) => {
        // Pegando dados do formulario
        res.send("Texto: " + req.body.titulo + "<br> Conteúdo: " + req.body.conteudo)
    })

app.listen(8081, () => {
    console.log("Servidor rodando")
}) // Ultima linha do código