const Secuelize = require('sequelize')
const secuelize = require('../utils/database')

const Card = secuelize.define( 'card',{
   id:{
       primaryKey:true,
      type:Secuelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
   },
   count:{
    // allowNull:false,
    type:Secuelize.INTEGER
   }
} )

module.exports = Card