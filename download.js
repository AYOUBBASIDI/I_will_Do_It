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
setTimeout(function(){
loading.style.display = "none"
downloadbtn.style.display = "block"
}, 3000);

let currentYear= new Date().getFullYear(); 

fetch('https://date.nager.at/api/v3/publicholidays/'+ currentYear +'/MA')
  .then((response) => response.json())
  .then((data) => {
    for(var i=0 ; i < data.length ; i++){
        holidays.push(data[i].date)
    }
    
    getData();
  })

function getData(){

    for(var i= 0 ; i < loop ; i++){
        const tomorrow = new Date(firstDay);
        tomorrow.setDate(tomorrow.getDate() + i)
        var date = new Date(tomorrow);
        var dayName = date.getDay();
        var day = date.getDate();
        if(day.toString().length == 1){
            day = "0" + day;
        }
        var month = date.getMonth()+1;
        if(month.toString().length == 1){
            month = "0" + month;
        }
        const year = date.getFullYear();
        var dataDate = year + "-" + month + "-" + day ;
        if(dayName != 0 && dayName != 6){
            datesArr.push(dataDate);
        }else{
            loop ++
        }
        
    }
    sliceHolidays();
}

function sliceHolidays(){
    for(var i=0 ; i < holidays.length ; i++){
        for(var j = 0 ; j < datesArr.length ; j++){
            if(holidays[i] === datesArr[j]){
                var index = datesArr.indexOf(datesArr[j]);
                datesArr.splice(index, 1);
            }
        }
    }
    getAllData();
}


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
    console.log(stockData);
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

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}