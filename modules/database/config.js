var mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"whatsapp"
});




exports.start = function start(params) {
  
  console.log("Database start")
}




exports.savetoDB = (productinfo,from)=>{

    conn.connect(function(err) {
        if (err) throw err 
        const price = productinfo[1]
        const info = productinfo[0]
        var sql = "INSERT INTO `orders`( `user_id`, `product`, `price`) VALUES( '"+from+"','"+info+"', '"+price+"')";
        
        conn.query(sql, function (err, result) {
          if (err) {
            throw err
          }
            console.log("1 record inserted");
        });


    })
}