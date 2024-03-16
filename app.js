// Carregando Módulos
const express = require('express')
const exphbs = require('express-handlebars')
const handlebars = exphbs.create({})
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin.js')
const path = require('path')
const { default: mongoose } = require('mongoose')
// const mongoose = require("mongoose")

// Configurações

// Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app. use(bodyParser.json())

// Handlebars
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Mongoose
const Schema = mongoose.Schema
mongoose.connect('mongodb+srv://fehcastru:MGytjSZP2IIO0ZqX@cluster0.xkxence.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('MongoDB conectado')
}).catch((err)=> {
    console.log(`Erro ao conectar ao MongoDB: ${err}`)
})

// Public
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    console.log('Meddleware')
    next()
})

// Rotas
app.use('/admin', admin)

// Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
