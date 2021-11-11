const Sequelize = require("sequelize");

const config = {
    username: "leo",
    password: "leo",
    database: "teste",
    host: 'localhost',
    logging: true,
    dialect: "mssql",
    dialectOptions:{
        instanceName: "SQLEXPRESS"
      }
};

//Inicia a configuração do banco de dados
const sequelize = new Sequelize(config);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Configura o model/tabela de clientes
db.Clientes = sequelize.define("Clientes", {
    nome: {
        type: Sequelize.STRING
    },
    apelido: {
        type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    cep: {
        type: Sequelize.STRING
    },
});

//Força a criação ou ajuste das tabelas no banco de dados X model
db.sequelize.sync({ force: true });

module.exports = db;