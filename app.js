// Carregando Módulos
const express = require('express')
const exphbs = require('express-handlebars')
const handlebars = exphbs.create({})
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin.js')
const usuarios = require('./routes/usuario.js')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

require('./models/Postagem.js')
const Postagem = mongoose.model('postagens')

require('./models/Categoria.js')
const Categoria = mongoose.model('categorias')

const passport = require('passport')
require('./config/auth.js')(passport)

// Configurações

// Sessão 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    
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
app.get('/', (req, res) => {
    Postagem.find().lean().populate('categoria').sort({ data: 'desc' }).then((postagens) => {
        res.render('index', { postagens: postagens })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao renderizar postagens')
        res.redirect('/404')
        console.log(err)
    })
})

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).lean().then((postagem) => {
        if (postagem) {
            res.render('postagem/index', { postagem: postagem })
        } else {
            req.flash('error_msg', 'Essa postagem não existe')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Erro interno')
        res.redirect('/')
        console.log(err)
    })
})

app.get('/404', (req, res) => {
    res.send('Erro 404')
})

app.get('/categorias', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('categorias/index', { categorias: categorias })
    }).catch((err) => {
        req.flash('error_msg', 'Erro listar categorias')
        res.redirect('/')
        console.log(err)
    })
})

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({ slug: req.params.slug }).lean().then((categoria) => {
        if (categoria) {
            Postagem.find({ categoria: categoria._id }).lean().then((postagens) => {
                res.render('categorias/postagens', { postagens: postagens, categoria: categoria })
            }).catch((err) => {
                req.flash('error_msg', 'Erro listar postagens desta categoria')
                res.redirect('/')
                console.log(err)
            })
        } else {
            req.flash('error_msg', 'Essa categoria não existe')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Erro na página desta categoria')
        res.redirect('/')
        console.log(err)
    })
})

app.use('/admin', admin)
app.use('/usuarios', usuarios)

// Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
