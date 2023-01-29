"use strict"

import * as fs from 'fs';
import regschedule from '../database/regularSchedule.json' assert { type: 'json' };


async function updateSchedule() {
  

}

console.log(await inSameWeek('27.01.2023'))

async function convertToDate(givenDate) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const date = new Date();
  let d = new Date(`${monthNames[givenDate.split('.')[1] - 1]} ${givenDate.split('.')[0]} ${givenDate.split('.')[2]} 9:00:00`);
  return d;
}

async function getDayFromDate(givenDate) {
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const d = await convertToDate(givenDate);
  return dayNames[d.getDay()];

}

async function inSameWeek(givenWholedate) {
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const givenDate = parseInt(givenWholedate.split('.')[0]);
  const givenMonth = parseInt(givenWholedate.split('.')[1]);
  const givenYear = givenWholedate.split('.')[2];
  const givenDay = await getDayFromDate(givenWholedate);

  const currentWholeDate = new Date();
  const currentDate = parseInt(currentWholeDate.getDate());
  const currentMonth = parseInt(currentWholeDate.getMonth() + 1);
  const currentYear = currentWholeDate.getFullYear();

  if (Math.abs(currentDate - givenDate) > 6) {
    return false;
  }

  const weekDates = [];
  weekDates.push(givenWholedate);
  if (dayNames.indexOf(givenDay) > 0) {
    for (let i = 1; i <= dayNames.indexOf(givenDay); i++) {
      if (givenDate-1<10) {
        weekDates.push(`0${parseInt(givenDate)-i}.${givenMonth}.${givenYear}`);
      } else {
      weekDates.push(`${parseInt(givenDate)-i}.${givenMonth}.${givenYear}`);
      }
    }
  }
  if (dayNames.indexOf(givenDay) < 7) {
    for (let i = 1; i < dayNames.length - dayNames.indexOf(givenDay); i++) {
      if (givenDate+1<10) {
        weekDates.push(`0${parseInt(givenDate)+i}.${givenMonth}.${givenYear}`);
      } else {
      weekDates.push(`${parseInt(givenDate)+i}.${givenMonth}.${givenYear}`);
      }
    }
  }
  return weekDates.includes(`${currentDate}.${currentMonth}.${currentYear}`);
}


