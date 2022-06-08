let discord = require('discord.js-selfbot-v11');
const fetch = require("node-fetch");
let rpcGenerator = require("discordrpcgenerator"); // npm i discordrpcgenerator
var uuid = ()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16));
let client = new discord.Client(); 
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
let finish = false;

let gift1 = "", gift2 = "", gift3 = "";
let gift1_number = 0, gift2_number = 0, gift3_number = 0;
let cardNum1 = "", cardNum2 = "", cardNum3 = "";

let TOKEN = '';
let SERVER_ID = '';
let CHANNEL_ID = '';
let IGN = '';

const readLine = require('readline');
const f = require('fs');
var file = './config.txt';
var rl = readLine.createInterface({
    input : f.createReadStream(file),
    output : process.stdout,
    terminal: false
});
rl.on('line', function (text) {
    if(text.split("=")[0] == "TOKEN"){
        TOKEN = text.split("=")[1];
    } else if(text.split("=")[0] == "SERVER_ID"){
        SERVER_ID = text.split("=")[1];
    } else if(text.split("=")[0] == "CHANNEL_ID"){
        CHANNEL_ID = text.split("=")[1];
        client.login(TOKEN);
    } else if(text.split("=")[0] == "IGN"){
      IGN = text.split("=")[1];
  }
});

function escapeRegExp(str) {
    const regexp = '``(.*?)``';
    const array = [...str.matchAll(regexp)];
    gift1 = array[0][1].toString();
    gift2 = array[1][1].toString();
    gift3 = array[2][1].toString();
}

client.on("ready", () => {
    console.log(`Script connected to ${client.user.username}`)
})

client.on("message", async (message) => {
  if(message.guild.id != SERVER_ID) { return; }
  if(message.channel.id != CHANNEL_ID) { return; }

    if(message.content.includes("Here are 3 15$ giftcards for you guys to use, we have added a 1 \"X\" at a random place in the code, find the missing number.")){
        escapeRegExp(message.content);

           await init_giftcard1(gift1);
           await init_giftcard2(gift2);
           await init_giftcard3(gift3);


           await setupGiftcardUsage(cardNum1);
           await setupGiftcardUsage(cardNum2);
           await setupGiftcardUsage(cardNum3);
    }


})

async function setupGiftcardUsage(giftcard){
    let driver = await new Builder().forBrowser(Browser.EDGE).build();
    try {
      await driver.get('https://buy.astropvp.net/login');
      await driver.findElement(By.className('form-control input-lg form-control-lg')).sendKeys(IGN, Key.RETURN);
      await driver.navigate().to("https://buy.astropvp.net/checkout/packages/add/4979729/single");

      await driver.findElement(By.className('form-control')).sendKeys(giftcard, Key.RETURN);
      await driver.findElement(By.className('btn btn-success btn-block')).click();
    } finally {
    }

}



async function init_giftcard1(giftcard){
    let debug = true;

    let driver = await new Builder().forBrowser(Browser.EDGE).build();
    try {
      await driver.get('https://buy.astropvp.net');

      while(debug){
        card_number = giftcard.replace("X", gift1_number);
        await driver.findElement(By.className('form-control')).sendKeys(card_number, Key.RETURN);
        await driver.wait(until.urlIs('https://buy.astropvp.net/#giftcardbalance'), 500);

          try {
            let amount = await driver.findElement(By.xpath("//strong[contains(text(),'Card balance:')]")).getText();
            console.log("[" + amount + "] " + card_number);
            cardNum1 = card_number;
            debug = false;
              } catch(NoSuchElementError){
                if(gift1_number < 10){
                  debug = true;
                  gift1_number++;
                  await driver.findElement(By.className('form-control')).clear();
                }
              }
      }
       
      
    } finally {
      await driver.quit();
    }
}

async function init_giftcard2(giftcard){
  let debug = true;

  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  try {
    await driver.get('https://buy.astropvp.net');

    while(debug){
      card_number = giftcard.replace("X", gift2_number);
      await driver.findElement(By.className('form-control')).sendKeys(card_number, Key.RETURN);
      await driver.wait(until.urlIs('https://buy.astropvp.net/#giftcardbalance'), 1);

        try {
          let amount = await driver.findElement(By.xpath("//strong[contains(text(),'Card balance:')]")).getText();
          console.log("[" + amount + "] " + card_number);
          cardNum2 = card_number;
          debug = false;
            } catch(NoSuchElementError){
              if(gift2_number < 10){
                debug = true;
                gift2_number++;
                await driver.findElement(By.className('form-control')).clear();
              }
            }
    }
     
    
  } finally {
    await driver.quit();
  }
}

async function init_giftcard3(giftcard){
  let debug = true;

  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  try {
    await driver.get('https://buy.astropvp.net');

    while(debug){
      card_number = giftcard.replace("X", gift3_number);
      await driver.findElement(By.className('form-control')).sendKeys(card_number, Key.RETURN);
      await driver.wait(until.urlIs('https://buy.astropvp.net/#giftcardbalance'), 1);

        try {
          let amount = await driver.findElement(By.xpath("//strong[contains(text(),'Card balance:')]")).getText();
          console.log("[" + amount + "] " + card_number);
          cardNum3 = card_number;
          debug = false;
            } catch(NoSuchElementError){
              if(gift3_number < 10){
                debug = true;
                gift3_number++;
                await driver.findElement(By.className('form-control')).clear();
              }
            }
    }
     
    
  } finally {
    await driver.quit();
  }
}

