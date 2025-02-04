const express=require("express");
const router=express.Router({mergeParams:true})
const ExerciseController=require("../controllers/exercise");

router
    .route("/")
    .get(ExerciseController.showExercise)
    
router
    .route("/exercise-info/:id")
    .get(ExerciseController.exerciseInfo)

router 
    .route("/add-exercise")
    .post(ExerciseController.addExerciseInfo)


module.exports=router;