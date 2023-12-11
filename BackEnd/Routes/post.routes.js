const express = require("express");
const {PostModel} = require("../Models/post.model");
const PostRouter = express.Router();
const {Auth} = require('../Middlewares/Auth.middleware');
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');



PostRouter.post('/add',Auth,async(req,res)=>{
    try {
        const post = new PostModel(req.body);
        await post.save()
        res.status(200).json({"Msg":"Post added succsessfully!"});
    } catch (error) {
        res.status(400).json({"Error":error});
    }
})

PostRouter.get('/',Auth,async(req,res)=>{
 const {email} = req.body;
 const {device,device1,device2} = req.query;
    try{
      
        if(device){
            const posts = await PostModel.find({email,device});
            res.status(200).json({"Posts":posts});
            return
        } 
        
        if(device1 && device2){
            const posts = await PostModel.find({email,device:[device1,device2]});
            res.status(200).json({"Posts":posts});
            return
        }

        const posts = await PostModel.find({email});
        res.status(200).json({"Posts":posts});
        return
    }
    catch(err){
     res.status(400).json({"Msg":err});
    }
})


PostRouter.patch('/update/:postId',Auth,async(req,res)=>{
    const {postId} = req.params;
    const {_userId} = req.body; 
    try {
       const post = await PostModel.findById(postId);
       if(post){
            if(post && post._userId == _userId){
             console.log("inside");
                await PostModel.findByIdAndUpdate(postId,req.body);
                res.status(200).json({"Msg":"Post updated sucsessfully"});
            }
            else{
             res.status(200).send({"Msg":"you are not authorized!"})
            }
       }
       else{
         res.status(200).send({"Msg":"Post not found!"})
       }    

    } catch (error) {
        console.log("err");
        res.status(400).json({"Error":error});
    }
})


PostRouter.delete('/delete/:postId',Auth,async(req,res)=>{
    const {postId} = req.params;
    const {_userId} = req.body; 
    try {
        const post = await PostModel.findById(postId); 
        if(post){
            if(post._userId == _userId){
                await PostModel.findByIdAndDelete(postId);
                res.status(200).json({"Msg":"Post deleted sucsessfully"});
            }
            else{
             res.status(200).send({"Msg":"you are not authorized!"})
            }
        }
        else{
         res.status(200).send({"Msg":"Post not found!"})  
        }    
    } catch (error) {
       res.status(400).send({"Error":error});
    }   
   })

module.exports = {PostRouter};