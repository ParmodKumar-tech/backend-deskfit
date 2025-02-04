const Exercise=require("../models/addExerciseSchema");

module.exports.showExercise=async(req,res)=>{
    try{
        const exercises=await Exercise.find({});
        res.status(200).json({ success: true, data: exercises });
    }
    catch(error){
        res.status(500).json({success:false, message:"Server Error",error:error.message})
    }
   

}

module.exports.exerciseInfo=async(req,res)=>{
    try{
        let {id}=req.params;
        const exerciseInfo=await Exercise.findOne({_id:id});
        res.status(200).json({success:true, data:exerciseInfo});
    }
    catch(error){
        res.status(500).json({success:false, message:"Server Error",error:error.message});
    }
    
}

module.exports.addExerciseInfo=async(req,res)=>{
    try{
        const addExerciseInfo=await Exercise.create({...req.body})
        res.status(200).json({success:true});
    
    }
    catch(error){
        res.status(500).json({success:false, message:"Server Error",error:error.message});

    }
    
}