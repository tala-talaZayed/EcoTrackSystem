const express = require ("express");//like import 
const app = express();
const userRouter = require("./API_Users/users/user.router");
app.use(express.json());

app.use("/API_Users/users",userRouter);
app.listen(3000, ()=>{
    console.log("hi");
});