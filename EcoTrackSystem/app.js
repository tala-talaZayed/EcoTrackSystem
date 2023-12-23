const express = require ("express");//like import 
const app = express();
const userRouter = require("./API/users/user.router");
const dataRouter = require("./API/data/data.router");
const userDataRouter = require("./API/userData/ud.router");
const reportRouter = require("./API/report/report.router");
app.use(express.json());
app.use("/API/users",userRouter);
app.use("/API/data",dataRouter);
//app.use("/API/user_data",userDataRouter);
app.use("/EcoSystem/User/Intrests",userDataRouter);
app.use("/EcoSystem/report", reportRouter);

app.listen(3000, ()=>{
    console.log("hello");
});

