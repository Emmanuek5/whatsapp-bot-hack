const express = require("express")
const app = express()


exports.start = function start(params) {
  app.listen(3000, () => {
   console.log("Application start")
  })

}



    
