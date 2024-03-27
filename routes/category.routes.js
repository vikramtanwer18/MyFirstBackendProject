
const category_controller = require("../controller/category.controller")
const categoryMW = require("../middleware/category.mw")
module.exports = (app)=>{
   app.post("/ecom/api/category",[categoryMW.verifyToken,categoryMW.isAdmin,categoryMW.category],category_controller.createNewCategory)
}







