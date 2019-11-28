const {Router} = require('express')
const router = new Router()
const auth = require('../middleware/auth')
const Courses = require('../models/courses')
router.get('/',auth,(req,res)=>{
    res.render('add',{
        title:"Добавить курс",
        isAdd:true
    })
})

router.post('/',auth, async(req,res)=>{
    try{
    const course = await Courses.create({
        title:req.body.title,
        price:+req.body.price,
        img:req.body.img,
    })
    // res.status(201).json({course})
    res.redirect('/courses')

    }catch(e){
        console.log(e)
        res.status(500).json({
            message:"server error"
        })
    }
 
})



module.exports = router