const category_module = require("../model/category.model")

exports.createNewCategory = async (req,res)=>{
    const request_body = req.body;

    const categoryObj = {
        name:request_body.name,
        description : request_body.description
    }
    try{
        const created_category = await category_module.create(categoryObj);
      return res.status(200).send(created_category)
    }catch(err){
      return res.status(500).send({
            message: "err while creating ecom category"
        })
    }

}









