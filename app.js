// Carregando Módulos
const express = require('express')
const exphbs = require('express-handlebars')
const handlebars = exphbs.create({})
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin.js')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// Configurações

// Sessão 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    
    next()
})

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

// Rotas
app.use('/admin', admin)

// Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
