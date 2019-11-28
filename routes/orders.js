const {Router} = require('express')
const router = new Router()

//models
const Sequelize = require('sequelize')
const Card = require('../models/card')
const User = require('../models/user')
const auth = require('../middleware/auth')
// const Course = require('../models/courses')
const {Courseorder,Order}=require('../models/order')
// const Course = Courseorder
router.get('/', auth,(req,res)=>{
    User.findOne({
        where:{email: req.user.email}
    })
    .then(user=>{
        if(!user)return
        
        user.getOrders()
        .then(orders=>{
            // console.log(orders)
            let arr = []
            let obj = {}
            for (let i=0 ; i < orders.length;i++){
                const order = JSON.parse(orders[i].dataValues.card)
                let price = 0
                  for(el of order){
                      price += +el.price 
                  }
                 obj = {
                         id: orders[i].dataValues.id, 
                          order,
                          price,
                          date:orders[i].dataValues.ordercourse.dataValues.date
                        }
                    //  console.log(obj)
                    arr.push(obj)
                     
                    }
                    
                        console.log(arr)
                      res.render('orders',{
                          isOrder:true,
                          arr
                      })
                    //   res.status(200).json(arr)
                    
                    // res.status(200).json(arr)
                    
        //     const order = JSON.parse(orders[0].dataValues.card)
           
           
        //    const obj = {
        //      id: orders[0].dataValues.id,
        //       user,  
        //       order,
        //       date:orders[0].dataValues.ordercourse.dataValues.date
        //     }
        //     console.log (obj)
        //     res.render("orders",{
        //         isOrder:true,
        //         obj,
        //     })
        })
        // .then(()=>{
           
        // })
        
      })
    })
  

router.post('/add',auth, (req,res)=>{
     


    User.findOne({
        where:{
            email:req.user.dataValues.email
        }
    })
    .then(user=>{
        if (!user)res.status(404).json({
            message:"server errors user"
        })
        user.getCourses()
        .then(courses=>{
           if(courses){
               let courseorder = []
               for(course of courses){
            //     //    price = price + course.card.count * course.price
            //          courseorder = {
            //              title:course.title,
            //              count: +course.card.count
            //          }
            //          console.log(courseorder)
            //           Order.create(courseorder)      
            
               courseorder.push({
                title:course.dataValues.title,
                price:course.dataValues.price,
            })
           
        }

         const card = JSON.stringify(courseorder)
         console.log(card)
         if(card){
            Card.findAll()
            .then(results=>{
                for(element of results){
                    Card.destroy({where: {id: +element.id} })
                }
            })

                Order.create({
                    card:card
                }).then(result=>{
                    if(!result)return
                     user.addOrder(result, {trough:{}})
                     .then((ress)=>{
                            if (ress){
                                res.redirect('/orders')
                            }
                     })
                    

                })
            }
           }})
        // .then(()=>{
        //          Order.findAll()
        //          .then(exzempliares=>{
        //              console.log('aaaaaaaaaaaaaaaaaa')
        //                 if(!exzempliares){console.log (exzempliares)}
        //             for(course of exzempliares){
        //                 console.log(course)
        //                 user.addOrder(course,{through:{}})
                       
        //             }   
        //          })
        //     }
        // )
        

        })














    // res.redirect('/orders')
})

module.exports = router