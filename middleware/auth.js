module.exports = async(req,res,next)=>{
   if(!req.session.isAutenticated){
     return  res.redirect('/auth/login#login')
   }
   next()
}