const express = require("express");
const {UserModel} = require("../Models/user.model");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

UserRouter.post("/register",async(req,res)=>{
 const {email,password} = req.body;
  try {
      const user = await UserModel.findOne({email});
      if(user){
        res.status(200).json({"Msg":"User with given email is already registerd"});
        return; 
      }

      bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.status(200).json({"Msg":err});
        }
        else{
            const newUser = new UserModel({...req.body,password:hash});
            await newUser.save();
            res.status(200).json({"Msg":"User has benn registerd Successfully"});
        }
      })
  } catch (error) {
      res.status(400).json({"Error":error});
  }
})

UserRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    const token = jwt.sign({email:user.email,_userId:user._id},"masai",{expiresIn:'30m'});
                    const refreshToken = jwt.sign({email:user.email,_userId:user._id},"masai",{expiresIn:'120m'});
                    res.status(200).json({"Msg":"Login Successful!",'token':token,"refresh_token":refreshToken});
                }
                else{
                    res.status(200).json({"Msg":"Wrong Creditionals! Please enter correct Password!"});
                }
            })
        }
        else{
            res.status(200).json({"Msg":"User not found with provided email!"})
        }
    } catch (error) {
        res.status(200).json({"Error":error});
    }
})







module.exports = {UserRouter};