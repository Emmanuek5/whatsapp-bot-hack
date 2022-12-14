const { mutateExecOptions } = require('nodemon/lib/config/load');
const qrcode = require('qrcode-terminal');
const mail = require("./modules/mail.js")
const server = require("./modules/server/server")
const db = require("./modules/database/mongo")

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

const date = new Date();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
   server.start()

});

client.on('message', msg => {
    const path = './logs/' + msg.id + '.txt'

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, date.toLocaleString + " : " + msg.body);
        console.log(`File ${fileName} created.`);
    } else {
        fs.writeFileSync(path, msg.body);
    }
    console.log("New Message  From "+msg.from+" Body: " + msg.body);
    
    if(msg.body == "1") {
        msg.reply("Select The Option That Suits Your Needs: \n Agro 1) Buy Meat/Chicken \n Agro 2) Buy Household Items \n Agro 3) Foodstuff \n Agro 4) Special Order  \n Note: Special Orders Have A N500 Fee ")
    }

    if (msg.body == "Agro 1") {

        msg.reply("Select The Size: \n M 1) Meat 1kg  \n M 2) Meat 5kg \n C 3) Chicken 1kg \n C 4) Chicken 5kg")


    }
    if (msg.body = "M 1") {
        msg.reply("Thank You For You Order. The Closest Dispatch Rider Will Contact You With The Details Of Your Order. ")
   mail.sendmail("andrewgbemisola@gmail.com","New Order HAS Been Placed For Meat 1kg At Price n1500 ","New Order","fsgsolutions@gmail.com")
    }else{

    client.sendMessage(msg.from, " Hello This Is FSG WORK SOLUTIONS \n  Select THe Options : \n 1) Fsg Agro \n 2) FSG Employments & Oppurtunities   \n 3) Fsg Investment Programs")

    

}}

 

   
 




);


client.initialize();
