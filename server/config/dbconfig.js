const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;

connection.on("connected",()=>{
    console.log("MongoDb Connection Successful")
})

connection.on("error",(err)=>{
    console.log("MongoDb connection failed")
})

module.exports = connection;