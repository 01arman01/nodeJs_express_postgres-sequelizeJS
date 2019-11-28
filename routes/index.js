const {Router}= require('express')
const router = new Router

router.get('/',(req,res)=>{
    //  console.log(req.user.dataValues)
    // console.log (sessions.user)
    res.render('index')
})

module.exports = router
