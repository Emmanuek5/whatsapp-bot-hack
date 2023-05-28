process.on("uncaughtException", (err) => {  
 console.log(`Unhandel Excecption: ${err.message} at ${err.stack}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`Unhandel Rejection: ${err.message} at ${err.stack}`)
})
const { mutateExecOptions } = require("nodemon/lib/config/load");
const qrcode = require("qrcode-terminal");
const mail = require("./src/modules/mail.js");
const server = require("./src/modules/server/server.js");
const db = require("./src/modules/database/config.js");
const log = require("./src/modules/server/logger.js");
const file = require("./src/modules/server/filesystem.js");
const email = "rccgheritageofgod@gmail.com";
const { Client, LocalAuth } = require("whatsapp-web.js");
const number = "+2348146695940";
const {processMessage} = require("./src/events/messageEvent")
const chatId = number.substring(1) + "@c.us";
server.start();
db.start();
const client = new Client({
  authStrategy: new LocalAuth(),
 puppeteer: {
    headless: true,
    args: [
        '--no-sandbox',
    ]}
});



const date = new Date();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
    
  processMessage(msg,client)
});

client.initialize();
