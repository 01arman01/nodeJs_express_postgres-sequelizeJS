const User = require('../models/user')
module.exports = async function(req,res,next){
    if(!req.session.user){
     next()
    }
    else{
        req.user = await User.findOne({
            wher:{id :req.session.user.id}
        })
        console.log(req.session.user.id)
        next()
    }
  
}
