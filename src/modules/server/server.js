const express = require("express")
const app = express()


exports.start = function start(params) {
  
  console.log("Application start")
}

app.get("/",(req,res)=>{
  res.send("Ho")
})

    
app.listen(3000, () => {

})