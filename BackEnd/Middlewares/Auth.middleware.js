
const jwt = require("jsonwebtoken");


const Auth = async(req,res,next)=>{
 const token = req.headers.authorization?.split(" ")[1];
 if(token){
    try {
         jwt.verify(token,"masai",async(err,decoded)=>{
           if(decoded){
              req.body.email = decoded.email;
              req.body._userId = decoded._userId; 
              console.log(req.body)
              console.log(decoded);
               next();
           }
           else{
            res.status(200).send({"Msg":"You are not authorized!"});
           }
         })
    } catch (error) {
       res.status(400).json({"Erorr":error});
    }
}
else{
    res.status(200).json({"Msg":"You are not authorized"})
}
}


module.exports={Auth};