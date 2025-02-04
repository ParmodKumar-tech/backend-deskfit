const mongoose=require("mongoose");


const addExerciseSchema=mongoose.Schema({
    name:String,
    duration:String,
    gifAnimation:String,
    url:String,
    instructions:[],
    focusArea:[],
    commonMistakes:[],
    breathingTips:[]
})

const Exercise=mongoose.model("exercise",addExerciseSchema);
module.exports=Exercise;