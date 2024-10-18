const mongoose =require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type: String
    },
    title:{
        type:String

    },
    price:{
        type:Number
    },
    desc:{
        type:String
    },
    emage:{
       data: Buffer, 
        contentType: String 
    }
    
})
const Item = mongoose.model("Items", UserSchema);
module.exports = Item;