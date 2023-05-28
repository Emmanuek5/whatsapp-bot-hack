const express = require("express")
const app = express()
require("dotenv").config()

exports.start = function start(params) {
  
  console.log("Application start")
}

app.get("/",(req,res)=>{
  res.send("Ho")
})

    
app.listen(process.env.PORT, () => {

})