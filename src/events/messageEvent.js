const qrcode = require("qrcode-terminal");
const mail = require("../modules/mail");
const db = require("../modules/database/config.js");
const los = require("../modules/server/logger.js");
const file = require("../modules/server/filesystem.js");
const email = "rccgheritageofgod@gmail.com";
const { Client, LocalAuth } = require("whatsapp-web.js");
const number = "+23470232056338";
const chatId = number.substring(1) + "@c.us";
const client = new Client();
const date = new Date();
const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() ;
 console.log(date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear(), time);
let  customorders = false
 let agro = false;
 let  agrosize = false;
 let employment = false;

function processMessage(msg, client) {
  console.log(msg.body, msg.id);
  los.log(msg.body, msg.from);

  if (customorders) {
    placeOrder(msg, msg.body, ": Store Determined", client);
    customorders = false;
    return;
  }

  if (agro) {
    switch (msg.body) {
      case "1":
        sendAgroOptions(msg);
        break;
      case "2":
        sendHouseholdOptions(msg);
        break;
      case "3":
        sendFoodstuffOptions(msg);
        break;
      case "4":
        customorders = true;
        handleCustomOrders(msg, client);
        break;
      default:
        sendDefaultResponse(msg, client);
        break;
    }
    agro = false;
    return;
  }

  if (employment) {
    // Handle employment-related options
    // Add your code here
    employment = false;
    return;
  }

  if (investment) {
    // Handle investment-related options
    // Add your code here
    investment = false;
    return;
  }

  switch (msg.body) {
    case "1":
      agro = true;
      sendAgroOptions(msg);
      break;
    case "2":
      employment = true;
      // Handle employment-related options
      // Add your code here
      break;
    case "3":
      investment = true;
      // Handle investment-related options
      // Add your code here
      break;
    case "4":
      sendSupportMessage(msg, client);
      break;
    case "YES":
      connectToAgent(msg, client);
      break;
    default:
      sendDefaultResponse(msg, client);
      break;
  }
}

function handleCustomOrders(msg, client) {
  client.sendMessage(msg.from, "Enter The Item You Want To Order");
}

function sendAgroOptions(msg) {
  msg.reply(
    "Select The Option That Suits Your Needs: \n Agro 1) Buy Meat/Chicken \n Agro 2) Buy Household Items \n Agro 3) Foodstuff \n Agro 4) Custom Order  \n Note: Custom orders like Groundnut oil, Plam Oil etc "
  );
}

function sendSizeOptions(msg) {
  msg.reply(
    "Select The Size: \n M1) Meat 1kg - N1200 \n M2) Meat 5kg -N1500 \n C3) Chicken 1kg - N2000 \n C4) Chicken 5KG -N3000"
  );
}

async function placeOrder(msg, item, price, client) {
  const info = [item, price];
  await client.sendMessage(
    chatId,
    `New Order Has Been Placed For ${item} At Price ${price}`
  );
  db.savetoDB(info, msg.from);
  msg.reply(
    "Thank You For Your Order. The Closest Dispatch Rider Will Contact You With The Details Of Your Order."
  );
  mail.sendmail(
    email,
    `New Order Has Been Placed For ${item} At Price ${price}`,
    "New Order",
    "fsgsolutions@gmail.com"
  );
}

function sendSupportMessage(msg, client) {
  client.sendMessage(
    msg.from,
    "Dear Customer, Please Send Your Message To The Support Team. We Will Get Back To You As Soon As Possible. Thank You For Choosing FSG Solutions. If You Want To Speak To An Agent, Please Enter YES"
  );
}

function connectToAgent(msg, client) {
  client.sendMessage(
    msg.from,
    "Please Wait While We Connect You To An Agent. Thank You For Choosing FSG Solutions"
  );
  var realnum = msg.from;
  var numbesr = realnum.replace("@c.us", "");
  client.sendMessage(
    chatId,
    "A New Customer Wants To Speak To An Agent. Please Contact Him/Her. Number: " +
      numbesr +
      ""
  );
}

function sendDefaultResponse(msg, client) {
  client.sendMessage(
    msg.from,
    "Hello, This Is FSG WORK SOLUTIONS \n Select The Options: \n 1) Fsg Agro \n 2) FSG Employments & Opportunities \n 3) Fsg Investment Programs \n 4) Contact Support"
  );
}

module.exports = { processMessage };
