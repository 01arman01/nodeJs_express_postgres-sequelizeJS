const express =  require("express")
const exphbs = require('express-handlebars')
const connection = require('./utils/database')
const bodyParser = require('body-parser')
const path = require('path')
const Sequelize = require('sequelize')
const session = require('express-session')
var SequelizeStore = require('connect-session-sequelize')(session.Store);
//medaleware
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
//for methods put and delete
const methodOverride = require('method-override');
//models
const Course = require('./models/courses')
const User = require('./models/user')
const Card = require('./models/card')
const {Order,Courseorder} = require('./models/order')

//routes
const indexRoute = require('./routes/index')
const coursesRoute = require('./routes/courses')
const addRoute = require('./routes/add')
const cardRout = require('./routes/card')
const orderRout = require('./routes/orders')
const authRout = require('./routes/auth')
// const {Session,extendDefaultFields}= require('./models/session')
const app = new express()
const PORT = process.env.app  || 3000






const hbs = exphbs.create({
    defaultLayout:"main",
    extname:"hbs"
})
// var sequelize = new Sequelize(
//     "courses",
//     "postgres",
//     "root", {
//         "dialect": "postgres",
//         "storage": "./session.postgres"
//     });
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')
//bodyParser

// app.use(async(req,res,next)=>{
//    try{
//     const user = await User.findOne({
//         where:{
//             name:"Arman"
//         }
//     })
//     if(!user){
//      const  user1 =   await User.create({
//             name:"Arman",
//             email:"papyan.arman95@mail.ru"
//         })
//       req.user = user1
       
//     }else{
//         req.user = user
//     }
    
//     // console.log(user)
//     // console.log(user.dataValues)
//     // console.log(req.user)
//     next()
//    }
//    catch(err){
//        console.error(err)
//    }

// })

//for methods
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

//session registrace
app.use(session({
    secret:'some sicret value',
    resave:false,
    store: new SequelizeStore({
        db:connection
    }),
    saveUninitialized:false,
    proxy:true
}))
app.use(varMiddleware)
app.use(userMiddleware)

User.belongsToMany(Course, {through: Card});
Course.belongsToMany(User, {through: Card});

User.belongsToMany(Order, {through: Courseorder});
Order.belongsToMany(User, {through: Courseorder});

 connection.sync(
            {
                // force:true
            }
            
            )
            .then(()=>{
                app.listen(PORT,()=>{
                    console.log(`server listening on port:${PORT}`)
            })
        })
        .then(()=>{
            //rotes
        app.use('/',indexRoute)
        app.use('/courses',coursesRoute)
        app.use('/add',addRoute)
        app.use('/card',cardRout)
        app.use('/orders',orderRout)
        app.use('/auth',authRout)

        })
        .catch(err=>{
            console.error(err)
        })



