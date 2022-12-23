const { mutateExecOptions } = require('nodemon/lib/config/load');
const qrcode = require('qrcode-terminal');
const mail = require("./modules/mail.js")
const server = require("./modules/server/server")
const db = require("./modules/database/config")
const log = require('.//modules/server/logger')
const file = require('./modules/server/filesystem')
const { Client, LocalAuth } = require('whatsapp-web.js');

server.start()
db.start()
const client = new Client({
    authStrategy: new LocalAuth()
});

const date = new Date();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');



});

client.on('message', async msg => {
    
    
    console.log("New Message  From " + msg.from + " Body: " + msg.body);
  log.log(msg.body,msg.from)
    if (msg.body == "1") {
        msg.reply("Select The Option That Suits Your Needs: \n Agro 1) Buy Meat/Chicken \n Agro 2) Buy Household Items \n Agro 3) Foodstuff \n Agro 4) Special Order  \n Note: Special Orders Have A N500 Fee ")
    }else{
        if (msg.body == "Agro 1") {

            msg.reply("Select The Size: \n M1) Meat 1kg - N1200 \n M2) Meat 5kg -N1500 \n C3) Chicken 1kg - N2000 \n C4) Chicken 5KG -N3000")


 

        } else {
            if (msg.body == "M1") {
               

                const info = ["Meat 1Kg","N1200"]
                db.savetoDB(info,msg.from)
                msg.reply("Thank You For You Order. The Closest Dispatch Rider Will Contact You With The Details Of Your Order. ")
                mail.sendmail("rccgheritageofgod@gmail.com", "New Order HAS Been Placed For Meat 1kg At Price N1200 ", "New Order", "fsgsolutions@gmail.com")
            client.sendMessage("2348142159080", "New Order Has Been Placed For Meat 1kg At Price N1200");
            } else {

               if (msg.body == "M2") {

                   const info = ["Meat 5Kg", "N1500"]
                   db.savetoDB(info, msg.from)
                   msg.reply("Thank You For You Order. The Closest Dispatch Rider Will Contact You With The Details Of Your Order. ")
                   mail.sendmail("rccgheritageofgod@gmail.com", "New Order HAS Been Placed For Meat 5kg At Price N1500 ", "New Order", "fsgsolutions@gmail.com")
                   client.sendMessage("2348146695940@c.us", "New Order Has Been Placed For Meat 5kg At Price N1500");

               }else{
               
               
                client.sendMessage(msg.from, " Hello This Is FSG WORK SOLUTIONS \n  Select THe Options : \n 1) Fsg Agro \n 2) FSG Employments & Oppurtunities   \n 3) Fsg Investment Programs")
               }
            }
}
        
    }


   
}

 

   
 




);


client.initialize();
