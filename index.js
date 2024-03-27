const express = require("express")
const mongoose =require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_module =require("./model/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())
// i want to create admin user so we can make the connection with mongoDb

mongoose.connect(db_config.db_URL)
const db = mongoose.connection
db.once("open",()=>{
    console.log("connected with mongoDb")
    init()
})
db.on("error",()=>{
    console.log("err while connecting the mongoDB",error)
})
async function init(){

    let user = await user_module.findOne({userId:"admin"})
    if(user){
        console.log("user admin is created before");
        return user
    }
    else{
        try{
        user = await user_module.create( {
            name:"Vikram Saini",
            userId :"admin",
            userType:"ADMIN",
            email:"Vikramsaini@gmail.com",
            password:bcrypt.hashSync("Vikram@123",8)
        })
        console.log("the admin user is:",user)
    }catch(err){
        console.log("err while crating amdin",err)
    }

    }
}

//call the routes and pass the app object

require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)
app.listen(server_config.PORT , ()=>{
    console.log("Server got startd at port:",server_config.PORT)
})