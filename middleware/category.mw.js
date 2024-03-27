const category_module = require("../model/category.model")
const user_module = require("../model/user.model")
const jwt = require("jsonwebtoken");
const auth_config =require("../configs/auth.jwt")

const category = async (req,res,next)=>{

const find_category = await category_module.findOne({name:req.body.name})
if(find_category){
  return res.status(400).send("The same category name iteam is already present")
}
    if(!req.body.name){
      return res.status(401).send({
            message:"Please provide category name"
        })
    }
        if(!req.body.description){
          return res.status(401).send({
                message:"Please provide category description"
            })
    }
    next()
}
const verifyToken = (req,res,next)=>{
  //Check if token is present in the header
  const token = req.headers['x-access-token']
  if(!token){
   return res.status(400).send({
      message: "Token is not found : Unauthorized"
    })
  }
  // if it's the valid token 
  jwt.verify(token,auth_config.secret,async(err,decoded)=>{
    if(err){
     return res.status(401).send({
      message : "Unauthorized !"
     })
    }
    const user = await user_module.findOne({userId:decoded.id})
    if(!user){
      return res.status(400).send({
        message : "UnAuthorzed, this user for this token doesn't exist"
      })
    }
    req.user = user;
    next()
  })
 // then move to next step
}

const isAdmin = (req,res,next)=>{
 const user =  req.user 
 if(user && user.userType == "ADMIN"){
  next()
 }else{
  res.status(400).send({
    message : "Only ADMIN user can allowed to change the endpoint"
  })
 }
}


module.exports = {
    category :category,
    verifyToken:verifyToken,
    isAdmin : isAdmin
}




















