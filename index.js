const mongoose = require("mongoose")

// Configurações Mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/teste", {
    useMongoClient: true
})
.then(() => {
    console.log("MongoDB conectado com sucesso")
})
.catch((err) => {
    console.log(err)
})