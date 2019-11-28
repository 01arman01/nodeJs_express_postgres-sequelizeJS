const connection = require('../utils/database')
const Sequelize = require('sequelize')

const Courseorder = connection.define('ordercourse',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true

    },
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    }

})
const Order = connection.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    card:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
})
module.exports={
    Order,
    Courseorder
}