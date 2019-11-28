const {Router}=require('express')
const router = new Router;
const User = require('../models/user')
router.get('/login',async(req,res)=>{
   res.render('auth/login',{
       title:'Авторизация',
       isLogin:true,
   })
})

router.post('/login',async(req,res)=>{
     
    try{
         const {email,password}= req.body
         const candidate = await  User.findOne({
             where:{
                 email:email
             }
         })
         if(!candidate){
             res.redirect('/auth/login#register')
         }
         console.log(candidate)
         const areSom = password ===  candidate.dataValues.password
        
        if(areSom){
            req.session.user = candidate
            req.session.isAutenticated = true
            req.session.save(err=>{
            if (err){
                throw err
            }
            res.redirect('/')
        })
        } else{
            res.redirect('/auth/login#login')
        }    

        
         
    }catch(e){
        console.error(e)
    }
   

    // const user = await User.findOne({
    //     where:{
    //         name:"Arman"
    //     }
    // })
    
    
})

router.get('/logouth',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/auth/login#login')
    })
    
})

router.post('/register',async (req,res)=>{
    try{
       const {email,password,name,repeat}=req.body   
       const candidate = await User.findOne({
           where:{email:email}
       }) 
       if (candidate){
           res.redirect('/auth/login#register')
       }else{
           const user = await User.create({
               name:name,
               email:email,
               password:password,

           })
           if (user){
               res.redirect('/auth/login#login')
           }
       }
    }catch(e){
        console.error(e)
    }
})


module.exports = router