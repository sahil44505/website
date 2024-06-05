const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');


router.post('/SignUp', async (req, res) => {


    const { Name, email, password } = req.body;
    const Exemail = req.body.email;
    const userExist = await User.findOne({ email: Exemail });
    if (userExist) {
        return res.status(401).json({ msg: "Email already exists" });
    }
    else if (!userExist) {
        const hashpassword = await bcrypt.hash(password, 10);
        await User.create({ Name, email, password: hashpassword });



        return res.status(200).json({ status: true, msg: "User created successfully" });
    }





});
router.post("/Login", async (req, res) => {

    const { Name, email, password } = req.body;

    const userExist = await User.findOne({ email }).select('+password');
    if (!userExist) {
        return res.status(401).json({ status: false, msg: "Unable to Login" })

    }
    const validPassword = await bcrypt.compare(req.body.password, userExist.password);
    if (!validPassword) {
        return res.status(401).json({ msg: "Password incorrect" })
    }
    const token = jwt.sign({ Name: userExist.Name }, process.env.KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.status(200).json({ msg: " Login SuccessFull ",token: token })

})
router.post("/ForgotPassword", async (req, res) => {
    const { Name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
        return res.status(401).json({ msg: "User not registered" });
    }
    const token = jwt.sign({ id: userExist._id }, process.env.KEY, { expiresIn: '5m' })
   

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pawarsah125@gmail.com',
            pass: 'bwpd dlck tmfa nqnl'
        }
    });
   
    const encodedToken = encodeURIComponent(token).replace(/\./g,"%2E")
    var mailOptions = {
        from: 'pawarsah125@gmail.com',
        to: email,
        subject: 'Reset password',
        text: `http://localhost:5173/ResetPassword/${encodedToken}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(401).json(" error sending Email ")
        } else {
            res.status(200).json(" Email sent ");
        }
    });

});
router.get("/ResetPassword/:token",async(req,res)=>{
    const token = req.params.token;
   
   console.log("HELLO");
    
    const{password} = req.body;
    try{
        const decoded =  jwt.verify(token,process.env.KEY);
        const id = decoded.id;
        const hashpassword = await bcrypt.hash(password,10);
        await User.findByIdAndUpdate({_id: id }, {password : hashpassword});
        return res.status(200).json({msg:"Password changed successfully"});

    }catch(error){
        return res.status(401).json({msg:"Unable to change the Password"})

    }

})






module.exports = router;