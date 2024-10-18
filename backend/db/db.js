const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/my_data`).then(() => { 

    console.log("Connection ho gya!!!") 
}).catch((error)=>{
    console.log(error)
})
