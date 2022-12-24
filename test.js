const data = require('./data/questions.json');


const { mutateExecOptions } = require('nodemon/lib/config/load');
const qrcode = require('qrcode-terminal');
const mail = require("./modules/mail.js")
const server = require("./modules/server/server")
const db = require("./modules/database/config")
const log = require('.//modules/server/logger')
const file = require('./modules/server/filesystem')
const email = "rccgheritageofgod@gmail.com"
const { Client, LocalAuth } = require('whatsapp-web.js');
const number = "+2348146695940"
const chatId = number.substring(1) + "@c.us";
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
    log.log(msg.body, msg.from)
    if (msg.body == "1") {
        msg.reply("Select The Option That Suits Your Needs: \n Agro 1) Buy Meat/Chicken \n Agro 2) Buy Household Items \n Agro 3) Foodstuff \n Agro 4) Special Order  \n Note: Special Orders Have A N500 Fee ")
    } else {
        if (msg.body == "Agro 1") {

            msg.reply("Select The Size: \n M1) Meat 1kg - N1200 \n M2) Meat 5kg -N1500 \n C3) Chicken 1kg - N2000 \n C4) Chicken 5KG -N3000")




        } else {

            if (msg.body == "M1") {


                const info = ["Meat 1Kg", "N1200"]
                db.savetoDB(info, msg.from)
                msg.reply("Thank You For You Order. The Closest Dispatch Rider Will Contact You With The Details Of Your Order. ")
                mail.sendmail(email, "New Order HAS Been Placed For Meat 1kg At Price N1200 ", "New Order", "fsgsolutions@gmail.com")
                client.sendMessage(chatId, "New Order Has Been Placed For Meat 1kg At Price N1200")
            } else {

                if (msg.body == "M2") {

                    const info = ["Meat 5Kg", "N1500"]
                    db.savetoDB(info, msg.from)
                    msg.reply("Thank You For You Order. The Closest Dispatch Rider Will Contact You With The Details Of Your Order. ")
                    mail.sendmail(email, "New Order HAS Been Placed For Meat 5kg At Price N1500 ", "New Order", "fsgsolutions@gmail.com")
                    client.sendMessage(chatId, "New Order Has Been Placed For Meat 5kg At Price N1500")

                } else {


                    if (msg.body == "C3") {

                        const info = ["Chicken 1Kg", "N2000"]
                        db.savetoDB(info, msg.from)
                        msg.reply("Thank You For You Order. The Closest Dispatch Rider Will Contact You With The Details Of Your Order. ")
                        mail.sendmail(email, "New Order HAS Been Placed For Chicken 1kg At Price N2000 ", "New Order")
                        client.sendMessage(chatId, "New Order Has Been Placed For Chicken 1kg At Price N2000")

                    } else {

                        if (msg.body == "C4") {

                            const info = ["Chicken 5Kg", "N3000"]
                            db.savetoDB(info, msg.from)
                            msg.reply("Thank You For You Order. The Closest Dispatch Rider Will Contact You With The Details Of Your Order. ")
                            mail.sendmail(email, "New Order HAS Been Placed For Chicken 5kg At Price N3000 ", "New Order")

                        } else {

                            if (msg.body == "4") {

                                client.sendMessage(msg.from, "Dear Customer, Please Send Your Message To The Support Team. We Will Get Back To You As Soon As Possible. Thank You For Choosing FSG Solutions. If You Want Yo Speak To An Agent  Please Enter YES")
                            } else {
                                if (msg.body == "YES") {
                                    client.sendMessage(msg.from, "Please Wait While We Connect You To An Agent. Thank You For Choosing FSG Solutions")
                                    var realnum = msg.from
                                    var numbesr = realnum.replace('@c.us', '');
                                    client.sendMessage(chatId, "A New Customer Wants To Speak To An Agent. Please Contact Him/Her.  Number: " + numbesr + "")


                                } else {





                                    client.sendMessage(msg.from, " Hello This Is FSG WORK SOLUTIONS \n  Select THe Options : \n 1) Fsg Agro \n 2) FSG Employments & Oppurtunities   \n 3) Fsg Investment Programs \n 4) Contact Support ")


                                }

                            }
                        }
                    }

                }







            }

        }

    }

}













);


client.initialize();
