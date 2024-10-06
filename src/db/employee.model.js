const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema({
     Image:{
        type:String,
        required:true
     },
     
    Name:{
        type:String,
        required:true,
        unique:true
    },
   
    Email:{
        type:String,
        required:true
    },
    

    Mobile:{
        type:String,
        required:true
    },
    Designation:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Course:{
        type:String,
        required:true
    },
    CreateDate:{
        type:String,
        required:true
    }
    
});
const employeeModel = mongoose.model("employee",employeeSchema);
module.exports= employeeModel