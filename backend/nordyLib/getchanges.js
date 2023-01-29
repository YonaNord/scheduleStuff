
import * as fs from 'fs';
import prevdata from '../database/changes.json' assert { type: 'json' };
import * as puppeteer from 'puppeteer';

export async function getChanges() {
  try {
    let browser = await puppeteer.launch();
    let changesList = [];
    const[page] = await browser.pages();
    page
    .on('console', message => {
      if (message.type().toUpperCase() == 'LOG' && message.text()[0] == '!') {
        changesList[message.text()[2]] = message.text().slice(4);
    }});
    await page.goto('https://alon.iscool.co.il/?view=8');
    await page.select('select[name="dnn$ctr1214$TimeTableView$ClassesList"]', '102');
    await page.waitForNavigation();
    await page.click('a[id="dnn_ctr1214_TimeTableView_btnChanges"]');
    await page.waitForNavigation();

    var changeLength = await page.evaluate(() => document.getElementsByClassName('msgCell').length);
    for (var i = 0; i < changeLength; i++) {await page.evaluate((i) => {function lol() {console.log('!', i, document.getElementsByClassName('msgCell')[i].innerText);}lol();}, i);}
    await browser.close();
    let needToSend = [];
    for (var i = 0; i < changesList.length; i++) {
      if (changesList[i] != prevdata[i]) {
        needToSend.push(changesList[i]);
      }
    }
    if (needToSend.length == 0) {
      needToSend = [false, "lol"];
    } else {
      fs.writeFile('./database/changes.json', JSON.stringify(needToSend), function(err) {
        if (err) throw err;
      });
    } 
    return needToSend;

  } catch (err) {
    console.error(err);
  }

};




//javascript:__doPostBack('dnn$ctr1214$TimeTableView$btnChanges','')