
const {User}=require("../models/Schema/userSchema");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

module.exports.login=async (req, res) => {

    const { email, password } = req.body;
    try {
      const isNewUser = await User.findOne({ email });
      if (!isNewUser) {
        return res.status(404).json({ success:false, message: "Account does not exists!" });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, isNewUser.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ success:false, message:"Incorrect password. Please try again." });
      }
  
      const token = jwt.sign({ id: isNewUser._id }, "fine");
      res.status(200).json({ success:true, token, userId: isNewUser._id, username: isNewUser.username,message: "Login successful!" });
    } catch (error) {
      
      res.status(500).json({ success:false ,message:"Internal Server Error",error:error.message });
    }
  }

  
module.exports.signup=async(req,res)=>{
      try{
          const {username,email,password}=req.body;
          const isUserExist=await User.findOne({email});
          if(isUserExist) return res.status(404).json({ success:false, message:"User already exists!"});
          const isUserExistBasedOnUsername=await User.findOne({username});
          if(isUserExistBasedOnUsername) return res.status(404).json({success:false ,message:"Username is already exists!"})
  
          else{
              const salt= await bcrypt.genSalt(10);
              const hashedPassword= await bcrypt.hash(password,salt);
              const newUser=await User.create({username,email,password:hashedPassword});
              const jwtToken=jwt.sign({id:newUser._id},"cool",{expiresIn:"1h"});
              res.status(200).json({success:true, message:"Signup Successfully!",token:jwtToken,username:newUser.username,userId:newUser._id});
          }
         

      }
      catch(error){
          res.status(500).json({message:"Internal Server Error", error:error.message});
      }
     
  
  }