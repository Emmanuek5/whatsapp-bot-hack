var mysql = require("mysql");

const conn = mysql.createConnection({
  host: "bamk9h0vf5undzn6n6af-mysql.services.clever-cloud.com",
  user: "unrvj2fp8va5dtil",
  password: "zxDTfJCexs5qWBshipmG",
  database: "bamk9h0vf5undzn6n6af",
});

exports.start = function start(params) {
  console.log("Database start");
};

exports.savetoDB = (productinfo, from) => {
  conn.connect(function (err) {
    if (err) throw err;
    const price = productinfo[1];
    const info = productinfo[0];
    var sql =
      "INSERT INTO `orders`( `user_id`, `product`, `price`) VALUES( '" +
      from +
      "','" +
      info +
      "', '" +
      price +
      "')";

    conn.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      console.log("1 record inserted");
    });
  });
};
