const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    }
})


module.exports.User=mongoose.model("user",userSchema);