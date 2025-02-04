
require('dotenv').config();

const express=require("express");
const app=express();
const PORT=process.env.PORT || 3000;
const mongoose=require("mongoose");
const cors=require("cors");
const ExerciseRoute=require("../backend/routes/execrise");
const UserRoute=require("../backend/routes/user");




// const dbURL="mongodb://127.0.0.1:27017/deskworker"
const dbURL=process.env.ATLASDB_URL;

const corsConfig = {
    origin: ["https://full-stack-desk-fit.vercel.app"], // ✅ Correct frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsConfig)); // ✅ Fixed syntax error
app.use(express.json());


async function main(){
    await mongoose.connect(dbURL)
}
main()
.then((res)=>console.log("connected with DB"))
.catch((e)=>{console.log(e)})


app.use("/",ExerciseRoute);
app.use("/user",UserRoute);


module.exports=app;
// app.listen(PORT,(req,res)=>{
//     console.log(`server is listing on ${PORT}`);
// })

