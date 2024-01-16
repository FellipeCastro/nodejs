const express = require("express")
const app = express()
// const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const Post = require("./models/Post")

// Config  
    // Tamplate Engine
        // app.engine("handlebars", handlebars({ defaultLayout: "main" }))
        // app.set("view engine", "handlebars")
    
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
// Rotas
    app.get("/", (req, res) => {
        Post.all({order: [["id", "DESC"]]})
        .then((posts) => {
            res.sendFile(__dirname + "/index.html", {posts: posts}) // handlebars
        })        
    })

    app.get("/cad", (req, res) => {
        res.sendFile(__dirname + "/form.html")
    })
    app.post("/add", (req, res) => {
        // Pegando dados do formulario
        // res.send("Texto: " + req.body.titulo + "<br> Conteúdo: " + req.body.conteudo)
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        })
        .then(() => {
            res.redirect("/")
        })
        .catch((erro) => {
            res.send("Erro: " + erro)
        })
    })

app.listen(8081, () => {
    console.log("Servidor rodando")
}) // Ultima linha do código