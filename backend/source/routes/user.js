import express from 'express';
import User from './../models/user.model.js'
const router=express.Router();
router.post('/register',async(req,res)=>{
    try{
    const {email,password,username}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({ message: 'Email already registered' });
    }
    const newUser=new User({email,password,username});
    await newUser.save();
    res.status(200).json({message:'new user joined',user:newUser});
    }catch(error)
    {
        console.log(`error is in registration:${error}`);
        res.status(400).json({error:`error registration:${error.message}`});
    }

})
export default router;
