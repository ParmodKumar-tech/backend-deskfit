
require('dotenv').config();

const express=require("express");
const app=express();
const PORT=process.env.PORT || 4000;
const mongoose=require("mongoose");
const cors=require("cors");
const ExerciseRoute=require("../backend/routes/execrise");
const UserRoute=require("../backend/routes/user");




const dbURL="mongodb://127.0.0.1:27017/deskworker"
// const dbURL=process.env.ATLASDB_URL;

app.use(cors());
app.use(express.json());

async function main(){
    await mongoose.connect(dbURL)
}
main()
.then((res)=>console.log("connected with DB"))
.catch((e)=>{console.log(e)})


app.use("/",ExerciseRoute);
app.use("/user",UserRoute);


app.listen(PORT,(req,res)=>{
    console.log(`server is listing on ${PORT}`);
})

