const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    Name :{
        type:String,
        required:true,
    },
    email :{
        type: String,
        required : true,
    },
    password:{
        type:String,
        required : true,

    },
    Cart : [{ type: Schema.Types.ObjectId,ref:"Product"}]
    
});
const User = new mongoose.model('User',userSchema);
module.exports = User;
