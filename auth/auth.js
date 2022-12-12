

const fs = require("fs");



 function save(msg,time,id ){
 const   path = './logs/' + id + '.txt'

     if (!fs.existsSync(path)) {
         fs.writeFileSync(path, time+" : "+ msg);
         console.log(`File ${fileName} created.`);
     } else {
         fs.writeFileSync(path, msg);
     }

}

module.exports = {
    save,
}

