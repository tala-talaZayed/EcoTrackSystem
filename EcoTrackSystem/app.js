const express = require ("express");//like import 
const app = express();
const userRouter = require("./API/users/user.router");
const dataRouter = require("./API/data/data.router");
const userDataRouter = require("./API/userData/ud.router");
const reportRouter = require("./API/report/report.router");
const sensorRouter = require("./API/sensor/sensor.router");

app.use(express.json());

app.use("/API/users",userRouter);
app.use("/EcoSystem/data",dataRouter);

app.use("/EcoSystem/User/Intrests",userDataRouter);
app.use("/EcoSystem/report", reportRouter);
app.use("/EcoSystem/sensor", sensorRouter);

app.listen(3000, ()=>{
    console.log("hello");
});

