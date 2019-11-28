const Secuelize = require('sequelize')
const secuelize = require('../utils/database')


const courses = secuelize.define('course',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:Secuelize.INTEGER,
        allowNull:false
    },
    title:{
       type:Secuelize.STRING,
       allowNull:false
    },
    price:{
        type:Secuelize.INTEGER,
        allowNull:false 
    },
    img:{
        type:Secuelize.STRING,
        allowNull:false
    }
    
});

module.exports = courses