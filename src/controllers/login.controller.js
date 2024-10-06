const userModel = require("../db/user.model")
const Jwt = require("jsonwebtoken");
 //login controller
 exports.loginController = async(req,res)=>{
const{username,password} =req.body;
try{
//check if the user already exist
let user = await userModel.findOne({username:username})
if(user){
    return res.status(400).send({result:"user already exist"})
  }

  //new user instance
  const newUserInstance = new userModel(req.body);
  const result = await newUserInstance.save();
  if(result){
    if(result){
        Jwt.sign({id:result._id},process.env.JWTkey,(err,token)=>{
            if(err){
                return res.status(403).send({result:err.message})
            }
            return res.status(200).send({result,auth:token})
        })
       }
        
  }
}
catch(err){
    return res.status(500).send({result:err.message})
}
 }
 