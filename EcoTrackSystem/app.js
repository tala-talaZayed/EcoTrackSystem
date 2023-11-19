const express = require ("express");//like import 
const app = express();
const userRouter = require("./API/users/user.router");
app.use(express.json());
app.use("/API/users",userRouter);
app.listen(3000, ()=>{
    console.log("hello");
});
