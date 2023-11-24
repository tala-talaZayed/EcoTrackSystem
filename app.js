const express = require ("express");//like import 
const app = express();
const userRouter = require("./API/users/user.router");
const dataRouter = require("./API/data/data.router");
app.use(express.json());
app.use("/API/users",userRouter);
app.use("/API/data",dataRouter);
app.listen(3000, ()=>{
    console.log("hello");
});
