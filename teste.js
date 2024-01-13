const Sequelize = require("sequelize")
const sequelize = new Sequelize("teste", "root", "Fsc#1531", {
    host: "localhost",
    dialect: "mysql"
})

// Verificando se o servidor está funcionando
// sequelize.authenticate().then(() => console.log("Conectado com sucesso")).catch((erro) => console.log("Falha ao se conectar: " + erro))