
const user_module = require("../model/user.model")


const verifedUserSignup = async(req,res,next)=>{
   try{
    if(!req.body.name){
        return res.status(400).send({
            message : "user name is not provide in req body"
        })
    }
    if(!req.body.email){
            return res.status(400).send({
                message:"user email is not provide in req body"
            })
        }
    if(!req.body.userId){
            return res.status(400).send({
                message:"user userId is not provide in req body"
            })
        }
    const user = await user_module.findOne({userId:req.body.userId})
    if(user){
        return res.status(400).send({
            message:"the same userId is already preasent "
        })
    }
   next()

   }catch(err){
    res.status(401).send({
        message:"err while verifeid the user signup"
    })
   }
}

const verifedUserSignin = async(req,res,next)=>{
        if(!req.body.userId){
          return res.status(401).send({
                message: "user id is not present "
            })
        }
        if(!req.body.password){
           return res.status(401).send({
                message: "password is not present "
            })
        }
        next()   
}








module.exports = {
    verifedUserSignup : verifedUserSignup,
    verifedUserSignin : verifedUserSignin
}























