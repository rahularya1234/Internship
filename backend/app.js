const express =require('express');
const multer =require('multer');
const app=express();
const cors = require('cors');
require("./db/db");
app.use(express.json()); 




app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));
app.options('*', cors());
app.use(require('./routes/Item'));  

// app.use("/", (req,res)=>{
//     res.status(200).send("hiii");
// })
const PORT =5002;
app.listen(PORT,()=>{
    console.log(`your server is started on port:${PORT}`);
});