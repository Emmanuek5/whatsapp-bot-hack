

const fs = require("fs");



 function save(msg,time,id = false){
 const   path = '/logs/' + id + '.txt'
if (fs.existsSync(path)) {
    fs.appendFile(path,msg);

}else{

    fs.writeFile(path,msg);
}


module.exports = {
   save,
}

}



