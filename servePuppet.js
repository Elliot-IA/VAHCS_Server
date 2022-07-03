/*const express = require("express"); 
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, ".")));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

console.log("Portal Server Initiated! Working Directory (for server js file):"+path.join(__dirname, "."));

const PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
    console.log("Server started on port 8080");
});

app.get("/", function(req, res){
    res.sendFile(__dirname+"/_.html");        
});

const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');

async function run () {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({headless: false});
    console.log("Launched Brower Window");
    const page = await browser.newPage();
    console.log("Opened new tab");
    await page.goto("https://studio.youtube.com/channel/UCGPaqgFF0dlWzViC9aC1hJg/editing/sections");
    console.log("Went to URL");  
    await page.screenshot({path: 'screenshot.png'});
    await console.log("Took Screenshot");
    //browser.close();
}
run();*/

const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
/*puppeteer.launch({ headless: false, devtools: true }).then(async browser => {
    console.log('Running tests...');
    const page = await browser.newPage();
    await page.goto('https://studio.youtube.com/channel/UCGPaqgFF0dlWzViC9aC1hJg/editing/sections');
    await page.type("#identifierId", "ianalexander.rje@gmail.com");
    await page.click("#identifierNext", {clickCount: 1});
    await page.waitForSelector("#passwordNext");
    debugger;

    document.querySelector("input[type=password]").value = "Perseverance"


    await page.type(".whsOnd", "Perseverance");
    await page.click("#passwordNext", {clickCount: 1});

});*/




const express = require("express"); 
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, ".")));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

console.log("Server Initiated! Working Directory (for server js file):"+path.join(__dirname, "."));

const PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
    console.log("Server started on port 8080");
});

app.get("/", function(req, res){
    res.sendFile(__dirname+"/_.html");        
});





