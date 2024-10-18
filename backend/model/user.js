const mongoose =require('mongoose');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bycrypt.hash(this.password,12);
    }
    next();
})
const user = mongoose.model("users", UserSchema);
module.exports = user;