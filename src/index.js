const express = require("express")
require('dotenv').config()
var path=require('path');
const cors = require("cors")
const mongoose = require("mongoose");
const { loginController } = require("./controllers/login.controller.js");
const {employeeController} = require("./controllers/employee.controller.js");
const {employeeListController} = require("./controllers/employee.controller.js")
const {deleteListItemController} = require("./controllers/employee.controller.js")
const{employeeDataController} = require("./controllers/employee.controller.js")
const{employeeUpdateController} = require("./controllers/employee.controller.js")
const {employeeSearchController} = require("./controllers/employee.controller.js")
const {verifyToken} = require("./middleware/auth.middleware.js")
const {db_name} = require("./utils/constants.js")
const {BASE_PATH} = require("./utils/constants.js")
const {upload} = require("./middleware/multer.middleware.js")
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use('/images',express.static('public'));

mongoose.connect(`${process.env.db_URL}/${db_name}`).then(()=>{
    console.log("db connected")
   })
   .catch((err)=>{console.log(err)})

   app.post(`${BASE_PATH}/user`,loginController)

   app.post(`${BASE_PATH}/employee`,verifyToken,upload.single("image"),employeeController);
   
   app.get(`${BASE_PATH}/employee/list`,verifyToken,employeeListController)
   app.delete(`${BASE_PATH}/deleteItem/:id`,verifyToken,deleteListItemController)
    app.get(`${BASE_PATH}/employee/:id`,verifyToken,employeeDataController)
    app.put(`${BASE_PATH}/updateEmployee/:id`,verifyToken,upload.single("image"),employeeUpdateController)
    app.get(`${BASE_PATH}/list/search`,verifyToken,employeeSearchController)
   app.listen(process.env.PORT,()=>{
    console.log("server started")
});