const {Router}= require('express')
const Sequelize = require('sequelize')
const Card = require('../models/card')
const User = require('../models/user')
const Course = require('../models/courses')
const auth = require('../middleware/auth')
const router = new Router()

router.post('/add',auth,(req,res)=>{
     User.findOne({
        where:{
            name:req.user.dataValues.name
        }
    })
    .then(user=>{
        if (!user)res.status(404).json({
            message:"server errors user"
        })
        Course.findOne({
            where:{id:+req.body.id}
        })
        .then(course=>{
            if (!course)res.status(404).json({
                message:"server errors course"
            })
            Card.findOne({
                where:{
                    courseId:course.dataValues.id
                }
            })
            .then(card=>{

                if(card){
                    card.count = +card.count +1
                    card.save()
                    .then(card=>{
                        // res.status(200).json(card)
                        console.log(card)
                        res.redirect('/card')
                    })
                }
                else{

                    user.addCourse(course, {through:{count:1}})
                    .then(()=>{
                        // res.status(200).json(card)
                        
                        res.redirect('/card')
                    })

                }
            })
            // console.log(course.dataValues)
        }) .catch(err=>{
            console.log(err)
        })
    })
   
    // console.log(+req.body.id)

  
  
})


router.get('/',auth,(req,res)=>{
    User.findOne({
        where:{
            name:req.user.dataValues.name
            // name:req.session.user.name
            // name : "Arman"
        }
    })
    .then(user=>{
        if (!user)res.status(404).json({
            message:"server errors user"
        })
        user.getCourses()
        .then(courses=>{
           if(courses){
               let price = 0
               for(course of courses){
                   price = price + course.card.count * course.price
               }
               res.render('card',{
                   title:"Карзина",
                   courses,
                   price,
                   isCard:true
               })
           }
        });
})


})


router.post('/remove/:id', auth,(req,res)=>{

    //   res.status(200).json(
    // {message:req.params.id}

// )
User.findOne({
    where:{
        name:req.user.dataValues.name
    }
})
.then(user=>{
    if (!user)res.status(404).json({
        message:"server errors user"
    })
    Course.findOne({
        where:{id:+req.params.id}
    })
    .then(course1=>{
        if (!course1)res.status(404).json({
            message:"server errors course"
        })
        Card.findOne({
            where:{
                courseId:+req.params.id
            }
        })
        .then(card=>{
            //  console.log(card)
            if(+card.dataValues.count > 1){
                card.count = +card.count -1
                card.save()
                .then(card=>{
                    res.redirect('/card')
                })
            }
            else if(+card.dataValues.count === 1){
                // console.log(course1.dataValues.name)
                user.getCourses().then(courses=>{
                    for(cours of courses){
                        if(cours.id===course1.id) cours.card.destroy();
                    }
                });
                res.redirect('/card')
            }
        })
        // console.log(course.dataValues)
    }) .catch(err=>{
        console.log(err)
    })
})
})


module.exports = router