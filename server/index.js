require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
// console.log(process.env.MONGO_URL)
// console.log("Loaded .env file:", process.env.MONGO_URL);
const dbconfig = require("./config/dbconfig")
const usersRoute = require("./routes/usersRoute")
const examsRoute = require("./routes/examsRoute");
const resportsRoute = require("./routes/reportsRoute");


app.use("/api/users",usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", resportsRoute);

const port = process.env.PORT || 7000;
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})
