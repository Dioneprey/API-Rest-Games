const Sequelize = require('sequelize')
const connection = require('./database')

const Games = connection.define("Games", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },price: {
        type: Sequelize.INTEGER,
        allowNull: false
    } 
})


module.exports = Games