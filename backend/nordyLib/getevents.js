"use strict"

const sheetId = '1yl22HGWh2DwbYE-zZGtAouUVZ4lEnAXVnyGZ3OUIc5w';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'שכבת י'
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const almostData = [];
const data = [];
// const output = document.querySelector('.output');
fs = require('fs');


async function getEvents() {
    fetch(url)
        .then(res => res.text())
        .then(async rep => {
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            // const tr = document.createElement('tr');
            jsonData.table.cols.forEach((heading, ind) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                    if (heading.label) {
                        // const th = document.createElement('th');
                        // th.innerText = column;
                        // tr.appendChild(th);
                    }
                }
            });
            // output.appendChild(tr);
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                });
                if (row['תאריך'].includes('/')) {almostData.push(row);} 
            });
            //processRows(data);
            var currentDate = new Date();
            var currentDay = currentDate.getDate();
            var currentMonth = currentDate.getMonth() + 1;
            var currentYear = currentDate.getFullYear();

            almostData.forEach((date, ind) => {
                var eventDate = date['תאריך']
                var eventDay = eventDate.split('/')[0];
                var eventMonth = eventDate.split('/')[1];
                var eventYear = eventDate.split('/')[2];

                if (!(((eventYear < currentYear || eventYear == currentYear) && (currentMonth - eventMonth>2)))) {
                    data.push(date);
                }
            });
            file = fs.writeFile('./backend/database/events.json', JSON.stringify(data), function(err) {
                if (err) throw err;
            });
        });


}



// function processRows(json) {
//     json.forEach((row) => {
//         const tr = document.createElement('tr');
//         const keys = Object.keys(row);
    
//         keys.forEach((key) => {
//             const td = document.createElement('td');
//             td.textContent = row[key];
//             tr.appendChild(td);
//         });
//         output.appendChild(tr);
//     });
// }

