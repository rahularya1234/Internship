const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');



const User = require('../model/user');






router.post("/user",async(req, res)=>{
    let success =false;
    const {name, email,phone,password}= req.body;
    if (!name|| !email || !phone || !password){
        return res.status(400).json({success,error:"please fill all the fields properly"});
    }else{
        try{
            const userexist=await User.findOne({email});
            if(userexist){
                return res.status(401).json({success,message:"user already exists with same email"})
            }else{
                const user=new User({name,email, phone,password});
                const saved= await user.save();
                if (saved){
                    success=true
                    return res.status(201).json({success,message:"user registration successfully"});
                }else{
                    success=false
                    return res.status(404).json({success,error:"user registration failed"});
                }
            }
        }catch(error){
            console.log("error",error);
            return res.status(500).json({error:"internal server error"});
        }
    }
})
// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Please fill in both email and password" });
    }
    console.log(password)

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        console.log(user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );
           console.log(isMatch);
           console.log(token);
        //    for save datqbase
           user.tokens = user.tokens.concat({ token });
           await user.save();
            // return;
            return res.status(200).json({ success: true, token, message: "User logged in successfully" });
        } else {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }


    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});




module.exports = router;