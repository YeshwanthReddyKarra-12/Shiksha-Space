const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const dns = require("dns")
const courseRoutes = require("./routes/courseRoutes")
const app = express()



app.use("/api/courses",courseRoutes)

// config() 
// require("dotenv").config();

dns.setServers(["1.1.1.1", "8.8.8.8"])
// app.get("/welcome",(req,res)=>{
//     res.send("Welcome back")
// })

connectDB()

app.listen(3000,()=>{
    console.log("listening to the PORT")
})