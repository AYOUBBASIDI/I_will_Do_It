var stockData = [];
var loading = document.getElementById("load");
var downloadbtn = document.getElementById("downloadbtn");
var config = JSON.parse(localStorage.getItem("config"));
var loop =JSON.parse(localStorage.getItem("subjects")).length;
var firstDay = config.firstDay;
console.log(config);
var dataLength = JSON.parse(localStorage.getItem("subjects")).length;
var datesArr = [];
var holidays = [];
holidays.push("2022-09-29")

//generate data loading (animation)
setTimeout(function(){
loading.style.display = "none"
downloadbtn.style.display = "block"
}, 3000);

let currentYear= new Date().getFullYear(); 

//fetching holidays api
// +currentYear  params of the year of holidays we want
// +MA the country of holidays
// data come like :
// {
//     "date": "2017-01-01",
//     "localName": "Neujahr",
//     "name": "New Year's Day",
//     "countryCode": "AT",
//     "fixed": true,
//     "global": true,
//     "counties": null,
//     "launchYear": 1967,
//     "types": [
//        "Public"
//     ]
//  },
fetch('https://date.nager.at/api/v3/publicholidays/'+ currentYear +'/MA')
  .then((response) => response.json())
  .then((data) => {
    for(var i=0 ; i < data.length ; i++){
        // we need just the date => "data[i].date"
        holidays.push(data[i].date)
    }
    getData();
  })

//Important function
//to generate the dates for each subjects (holidays and weekend not inclu)
function getData(){
    for(var i= 0 ; i < loop ; i++){
        //first day is the date that user choose 
        //exemple : firstday = 2022-01-01 => date = Tue Jan 01 2022 11:39:29 GMT+0100 (GMT+01:00)
        var date = new Date(firstDay);
        date.setDate(date.getDate() + i);//to get next date
        var dayName = date.getDay();//get [0-6] => [sun - sat]
        var day = date.getDate(); // Tue Jan #01# 2022 11:39:29 GMT+0100 (GMT+01:00)
        if(day.toString().length == 1){
            day = "0" + day; // get day = 1 return day = 01
        }
        var month = date.getMonth()+1; // get month = janvier = 0 return 
        if(month.toString().length == 1){
            month = "0" + month;// get month = 1 return month = 01
        }
        const year = date.getFullYear();
        var dataDate = year + "-" + month + "-" + day ; // set date ex : 2022-01-01
        let result = sliceHolidays(dataDate); 
        if(dayName != 0 && dayName != 6 && result == 0){
            datesArr.push(dataDate);
        }else{
            loop ++
        }
        
    }
    getAllData();
}

// function checking if the date inclu in holidays array
function sliceHolidays(date){
    for(var i=0 ; i < holidays.length ; i++){
            if(holidays[i] === date){
                return 1; //date inclu in holidays
            }else{
                return 0; //date not inclu in holidays
        }
    }
}

// create a final array stock names of student and subjects and dates
 function  getAllData(){
    var dataNames = JSON.parse(localStorage.getItem("dataNames"));
    var dataSubjects = JSON.parse(localStorage.getItem("DataSubjects"));
    for(var i = 0 ; i < dataSubjects.length ; i++){
        var obj = {
            "number" : i+1,
            "name" : dataNames[i],
            "subject" : dataSubjects[i],
            "date" : datesArr[i],
        }
        stockData.push(obj);
    }
 }

 function convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args) {  
    var success = document.getElementById("success");
    success.innerHTML = "The file is ready now"
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data: stockData
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);
//create element with data of csv file in href and click on it to download the file
    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}