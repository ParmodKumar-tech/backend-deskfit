const express=require("express");
const router=express.Router({mergeParams:true});
const user=require("../controllers/user");

router
    .route("/signup")
    .post(user.signup)
    
router
    .route("/login")
    .post(user.login)    


module.exports=router;    