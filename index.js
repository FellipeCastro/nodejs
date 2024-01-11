const express = require("express")
const app = express()

app.get("/", function(req, res) {
    res.sendFile(__dirname /*Caminho da pasta atual*/ + "/html/index.html") // nomePasta/html/index.html
})

app.get("/sobre", function(req, res) {
    res.sendFile(__dirname + "/html/sobre.html")
})

app.get("/blog", function(req, res) {
    res.send("Bem-vindo ao meu blog")
})

app.get("/ola/:nome/:cargo", function(req, res) {
    res.send("<h1>Ola " + req.params.nome + "</h1>" + "<h2>Seu cargo e " + req.params.cargo + "</h2>")
})

app.listen(8081, function() {
    console.log("Servidor rodando")
}) // Ultima linha do código