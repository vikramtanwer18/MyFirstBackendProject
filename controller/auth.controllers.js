
const user_module = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.jwt")
exports.signup = async (req,res)=>{
   //read the request body    
const request_body = req.body
// insert the data in the user collection in mongoDB
const userObj = {
    name : request_body.name,
    userId : request_body.userId,
    userType:request_body.userType,
    email :request_body.email,
    password: bcrypt.hashSync(request_body.password,8)
}
try{
   
const user_created =  await user_module.create(userObj)
 //return the response
   res.status(201).send(user_created)

}catch(err){
    console.log("error while creating user",err)
    res.status(500).send({
      message: "the error while the creating the user "
    })
}
}



exports.signin = async (req,res)=>{
  // check the user id is present 
 const user = await user_module.findOne({userId:req.body.userId})
 if(user==null){
  return res.status(400).send({
    message : "userId is not valid"
  })
 }
   
 const isPasswordValid =bcrypt.compareSync(req.body.password,user.password)
 if(!isPasswordValid){
 return res.status(400).send({
    message : "user password is not valid"
  })
 }

 const token = jwt.sign({id:user.userId},secret.secret,{
  expiresIn:120
 })

 res.status(200).send({
  name : user.name,
  userId :user.userId,
  email : user.email,
  userType : user.userType,
  accessToken : token
})

}




























