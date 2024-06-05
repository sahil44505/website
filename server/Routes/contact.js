const express = require('express');
const router = express.Router();
const Contact = require("../models/Contact");


router.post("/Contact", async(req,res)=>{
    try{
        const response =  req.body;
        await Contact.create(response);
        return res.status(200).json({msg:" message sent successfully"});

    }catch(error){
        return res.status(500).json({msg:" message not delivered"});

    }
});

module.exports = router;