const Jwt = require("jsonwebtoken");
exports.verifyToken = (req,res,next)=>{
    const auth = req.headers.authorization
    //console.log("auth", auth)
const token = auth.split(" ")[1];
console.log("my token ", token)
if (!token) {
return res.status(401).json({result: 'Unauthorized access' });
}
try{
    const data = Jwt.verify(token,process.env.JWTkey)
    //console.log("data ",data.result)
    req.userId = data.id;
    //console.log("data2",req.userId)
    next();
}
catch(err){
    console.log("err", err)
 res.status(403).send({result:"invalid token"})
}
}