const employeeModel = require("../db/employee.model");
const Jwt = require("jsonwebtoken");
//create Employee
exports.employeeController = async(req,res)=>{
    
      console.log("body",req.body);
    const {name,email,mobile,designation,gender,course,createDate} = req.body;
    try{
        const myEmail = await employeeModel.findOne({Email:email})
        if(myEmail){
            return res.status(400).send({result:"email already exist"})
          }
          const newemployeeInstance = new employeeModel({
            Image:req.file.filename,
            Name:name,
            Email:email,
            Mobile:mobile,
            Designation:designation,
            Gender:gender,
            Course:course,
            CreateDate:createDate
          });
  const result = await newemployeeInstance.save();
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
//employee list
exports.employeeListController = async(req,res)=>{
   try{
    const employeeList = await employeeModel.find();
    if(employeeList){
        return res.status(200).send({employeeList})
    }
   }
   catch(err){
    return res.status(500).send({result:err.message})
   }
}
//delete list item
exports.deleteListItemController = async(req,res)=>{
    try{
        const id=  req.params.id;
        const resp = await employeeModel.deleteOne({_id:id})
        res.status(200).send(resp)
      }
      catch(err){
        res.status(500).send({error:err.message})
      }
}
exports.employeeDataController = async(req,res)=>{
    try{
    const id = req.params.id;
    console.log("id>>",id);
    const resp = await employeeModel.findById({_id:id})
    res.status(200).send(resp)
    console.log(resp)
    }
    catch(err){
        res.status(500).send({error:err.message})
    }
}
exports.employeeUpdateController = async(req,res)=>{
    try{
      const id = req.params.id;
      const {name,email,mobile,designation,gender,course,createDate} = req.body;
      const resp = await employeeModel.findByIdAndUpdate(id,{Image:req.file.filename,
        Name:name,
        Email:email,
        Mobile:mobile,
        Designation:designation,
        Gender:gender,
        Course:course,
        CreateDate:createDate});
        if(resp){
         return res.status(200).send(resp)
        }
        else{
            res.status(400).send({message:"employee not updated"})
        }
    }
    catch(err){
        res.status(500).send({error:err.message})
    }

}

exports.employeeSearchController = async(req,res)=>{
    try{
const {query} = req.query;
console.log(query)
if(!query){
    return res.status(400).json({ message: 'Query parameter is required.' });
}
const employees = await employeeModel.find({
    $or: [
        { Name: { $regex: query, $options: 'i' } },
        { Email:{ $regex: query, $options: 'i' } }
      ]
  });
  res.status(200).send(employees);
    }
    catch(err){
        console.log("err>>>",err)
        res.status(500).send({error:err.message})
    }
}