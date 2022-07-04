/*gt
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
    res.sendFile(__dirname+"/vahcs.html");
});
app.post("/", function(req, res){
    if(req.body.command == "emailMe"){
        console.log("Running emailMe request");
        sendMyselfAnEmail();
        res.status(204).send();
    }else if(req.body.command == "runCode"){
        console.log("Running runCode request");
        var codeAsString = req.body.data;
        console.log("Given code:\n"+codeAsString);
        runPureCode(codeAsString);
        res.status(204).send();
    }else{
        console.log("(!)A post request was made but the command was not recognized");
        res.status(204).send();
    }
});

var universalPage = null;
function sendMyselfAnEmail(){
    // puppeteer usage as normal
    puppeteer.launch({ headless: false, devtools: true }).then(async browser => {
        const page = await browser.newPage();
        universalPage = page;
        console.log('Logging into inbox...');
        //const page = await browser.newPage();
        await page.goto('https://mail.google.com/mail/u/1/?fs=1&tf=cm&source=mailto&to');

        await loginTo_RJE(page);

        console.log('Awaiting compose to load up...');
        await page.waitForTimeout(5000);
        
        await page.waitForSelector("#sbddm");
        console.log('Great compose should be ready');

        console.log('Writting who email should be sent to...');
        await page.keyboard.type("alexa818@umn.edu");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        console.log('Writing Email subject line...');
        await page.keyboard.type("This is from VAHCS!");
        await page.waitForTimeout(500);
        
        //await page.type('.editable', 'Sir, your email was sent sucsessfully!');
        console.log('Pressing send...');
        await page.keyboard.press("Tab");
        await page.waitForTimeout(500);
        await page.keyboard.press("Enter");
        console.log('Message Sent!');
        console.log('v/ EmailMe Sequence complete');
        page.close();
    });
}


function uploadYoutubeVideo(){
    // puppeteer usage as normal
    puppeteer.launch({ headless: false, devtools: true }).then(async browser => {
        const page = await browser.newPage();
        universalPage = page;
        console.log('Logging into Youtube...');
        await page.goto('https://studio.youtube.com/channel/UCGPaqgFF0dlWzViC9aC1hJg/editing/sections');

        loginTo_RJE();
    });
}

async function loginTo_RJE(page){
    console.log('Logging into your gmail account...');
    await page.type("#identifierId", "ianalexander.rje@gmail.com");
    await page.click("#identifierNext", {clickCount: 1});
    await page.waitForSelector("#passwordNext");
    //debugger;

    await page.waitForTimeout(3000);

    await page.evaluate(()=>{
        document.querySelector("input[type=password]").value = "Perseverance";
    });

    //await page.type(".whsOnd", "Perseverance");
    await page.click("#passwordNext", {clickCount: 1});
}

async function runPureCode(codeStr){
    console.log("Running a string of pure code...");
    eval(codeStr);
}




