const mongoose = require("mongoose")

// Configurações Mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/teste" /*, {useMongoClient: true}*/)
.then(() => {
    console.log("MongoDB conectado com sucesso")
})
.catch((err) => {
    console.log(err)
})

// Model - Usuários

// Definindo Model
const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String, 
        require: true // Campo obrigatório
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
})

// Collection
mongoose.model("usuarios", UsuarioSchema)

// Inserindo dados

const novoUsuario = mongoose.model("usuarios")
new novoUsuario({
    nome: "Fellipe",
    sobrenome: "Castro",
    email: "fellipecastro@email.com",
    idade: 16,
    pais: "Brasil"
})
.save()
.then(() => {
    console.log("Usuário cadastrado com sucesso")
})
.catch((err) => {
    console.log(err)
})