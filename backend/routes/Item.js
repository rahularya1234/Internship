const express = require('express')
const router = express.Router();
const multer = require('multer');
const Item = require('../model/Item');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.post("/Item",upload.single("emage"), async(req,res)=>{

//     try{
//         const info = new Item({...req.body, emage:req.file.buffer});
//         const saved =await info.save();
//         if(saved){
//             res.status(201).json({message:"user data submit ho gya!!"});
//         }else{
//             res.status(400).json({error:"user data not submited"});
//         }
//     }catch(error){
//         res.status(500).json({error:"error server", details: error.message })
//     }
// })
router.post("/Item", upload.single('emage'), async (req, res) => {
    try {
        const info = new Item({
            name: req.body.name,
            title: req.body.title,
            price: req.body.price,
            desc: req.body.desc,
            emage: {
                data: req.file.buffer, // image data
                contentType: req.file.mimetype // image type
            }
        });
        const saved = await info.save();
        if (saved) {
            res.status(201).json({ message: "User data submitted successfully!" });
        } else {
            res.status(400).json({ error: "User data not submitted" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;


router.get("/Item", async(req,res)=>{
    try{
        
        const data =await Item.find();
        res.status(200).send(data);
    }catch(error){
        res.status(500).json({message : " server error", details: error.message})
    }
})

router.delete("/Item/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await Item.findByIdAndDelete(id);
        if(data){
            res.status(200).json({message: "data deleted "})
        }
        else{
            res.status(400).json({error:"Error occurs"})
        }
    } catch (error) {
        res.status(500).json({error:"server error ",details: error.message})
    }
})

router.get("/Item/:id", async(req,res)=>{
    try{
        const id =req.params.id;
        const data = await Item.findById(id);
        res.status(200).send(data);
    }catch(error){
        res.status(500).json({error:"server error", details: error.message});


    }
    
})

router.patch("/Item/:id", async(req,res) =>{
    try {
        const id = req.params.id;
        const data = await Item.findByIdAndUpdate(id,req.body, { new: true })

        if(data) {
            res.status(200).json({message: "data updated"})
        }
        else{
            res.status(404).json({error: "not updated"})
        }
    } catch (error) {
        res.status(500).json({error: " Server issue",details: error.message });
    }
})





// router.post("/bulk-items", async (req, res) => {
//     try {
//         const items = req.body; 
//         const savedItems = await Item.insertMany(items); // Bulk insert
//         res.status(201).json({ message: "Items saved successfully!", data: savedItems });
//     } catch (error) {
//         res.status(500).json({ error: "Server error", details: error.message });
//     }
// });


module.exports = router;