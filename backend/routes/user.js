const express = require('express')
const router = express.Router();
const user = require('../model/user');


router.post("/user",async(req, res)=>{
    let success =false
    const {name, email,phone,password}= req.body;
    if (!name|| !email || !phone || !password){
        return res.status(400).json({success,error:"please fill all the fields properly"});
    }else{
        try{
            const userexit=await user.findOne({email});
            if()
        }
    }
})
