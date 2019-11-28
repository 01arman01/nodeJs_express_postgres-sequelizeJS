const {Router} = require("express")
const Courses = require('../models/courses')
const router = new Router()
const auth = require('../middleware/auth')
router.get('/', async(req,res)=>{
   try{
    const courses = await Courses.findAll()
    res.render('courses',{
        title:'Курсы',
        courses,
        isCourses:true
    })

   }catch(e){
       console.log(e)
       res.status(500).json({
           message:"server error"
       })
   }

})
router.get('/:id/edit',auth, async(req,res)=>{
    const id = req.params.id
    const course = await Courses.findByPk(id)
    console.log(req.query.allow)
    if(!req.query.allow ){
        res.redirect('/courses')
    
  }
  res.render('course-edit',{
    course
})
 
      
  
})
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    const course = await Courses.findByPk(id)
  res.render('course',{
      layout:'empty',
      title:course.title,
    course
})
 
      
  
})

router.put('/edit/:id', auth,async(req,res)=>{
  try{
      console.log(req.body)
      const course =await Courses.findByPk(+req.params.id)
       
      course.title = req.body.title || course.title 
      course.price = req.body.price ||  course.price 
      course.img = req.body.img  || course.img 
     
      await course.save()
      res.redirect('/courses')

  }catch(e){
   console.log(e)
   res.status(500).json({
       message:'server error'
   })
  }
})
router.delete('/remove/:id',auth, async(req,res)=>{
    console.log(req.params.id)
  try{
         const course = await Courses.findAll({
             where:{
                 id:+req.params.id
             }
         })
         await course[0].destroy()
      res.redirect('/courses')
  }catch(e){
     console.log(e)
     res.status(500).json({
         message:"server error"
     })
  }

})
module.exports = router 