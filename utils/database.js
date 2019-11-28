const Sequelize = require('sequelize')


const DB_NAME = 'courses';
const USER_NAME = 'postgres'
const PASSWORD ='root'

const conneaction = new Sequelize(DB_NAME,USER_NAME,PASSWORD,{
    host:'localhost',
    dialect:'postgres',
    "storage": "./session.postgres",
    define: {
        timestamps: false
      }
})

module.exports = conneaction