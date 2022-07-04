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
    console.log("Server started on port "+ PORT);
    if(PORT == 8080){
       settingsToUse = localSettings;
    }
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

var localSettings = {headless: false, devtools: true };
var deploymentSettings = {headless: true, devtools: false,  args: ["--no-sandbox", "--disable-setuid-sandbox"]};
var settingsToUse = deploymentSettings;

var universalPage = null;
function sendMyselfAnEmail(){
    // puppeteer usage as normal
    puppeteer.launch(settingsToUse).then(async browser => {
        const page = await browser.newPage();
        universalPage = page;
        console.log('Logging into inbox...');
        //const page = await browser.newPage();
        await page.goto('https://mail.google.com/mail/u/1/?fs=1&tf=cm&source=mailto&to');

        await loginTo_RJE(page);

        console.log('0s/40s Awaiting compose to load up...');
        await page.waitForTimeout(10000);
        console.log('10s/40s Awaiting compose to load up...');
        await page.waitForTimeout(10000);
        console.log('20s/40s Awaiting compose to load up...');
        await page.waitForTimeout(10000);
        console.log('30s/40s Awaiting compose to load up...');
        await page.waitForTimeout(10000);
        
        
        //await page.waitForSelector("#sbddm");
        console.log('40s/40s Great compose should be ready');

        console.log('Writting who email should be sent to...');
        await page.keyboard.type("alexa818@umn.edu");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.waitForTimeout(2000);
        console.log('Writing Email subject line...');
        await page.keyboard.type("This is from VAHCS!");
        await page.waitForTimeout(1000);
        await page.keyboard.press("Tab");
        await page.waitForTimeout(1000);
        console.log('Writing Email body...');
        await page.keyboard.type('Sir, your email was sent sucsessfully!');
        await page.waitForTimeout(1000);
        console.log('Pressing send...');
        await page.keyboard.press("Tab");
        await page.waitForTimeout(1000);
        await page.keyboard.press("Enter");
        console.log('Message Sent!');
        console.log('v/ EmailMe Sequence complete');
        //page.close();
    });
}


function uploadYoutubeVideo(){
    // puppeteer usage as normal
    puppeteer.launch(settingsToUse).then(async browser => {
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
    
    console.log('Clicking next...');
    await page.click("#identifierNext", {clickCount: 1});
    
    /*console.log("Waiting for password block to load...");
    await page.waitForTimeout(3000);
    console.log("1/5 delays elasped, 3s");
    await page.waitForTimeout(3000);
    console.log("2/5 delays elasped, 6s");
    await page.waitForTimeout(3000);
    console.log("3/5 delays elasped, 9s");
    await page.waitForTimeout(3000);
    console.log("4/5 delays elasped, 12s");
    await page.waitForTimeout(3000);
    console.log("5/5 delays elasped, 15s");
    console.log("PasswordNext button should now be available");    
    await page.waitForSelector("#passwordNext");*/

    console.log('email address entered');
    await page.waitForTimeout(3000);
    console.log('Pressing enter key...');
    await page.keyboard.press("Enter");
    console.log('Waiting some time...');
    await page.waitForTimeout(5000);
    await page.keyboard.type("Perseverance");
    console.log('Waiting some time...');
    await page.waitForTimeout(1500);
    await page.keyboard.press("Enter");
    
    
/*    await page.evaluate(()=>{
        document.querySelector("input[type=password]").value = "Perseverance";
    });*/
    
    //await page.type(".whsOnd", "Perseverance");
    //await page.click("#passwordNext", {clickCount: 1});
}

async function runPureCode(codeStr){
    console.log("Running a string of pure code...");
    eval(codeStr);
}




