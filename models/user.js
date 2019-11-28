const Sequelize = require('sequelize')
const connection = require('../utils/database')

const user = connection.define('user',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        // allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
    


})
// const Cart = connection.define('')


module.exports = user