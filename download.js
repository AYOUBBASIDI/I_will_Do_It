var loading = document.getElementById("load");
var downloadbtn = document.getElementById("downloadbtn");
var config = JSON.parse(localStorage.getItem("config"));
// var firstDay = config[0].firstDay;
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

    for(var i= 0 ; i < 10 ; i++){
        const today = new Date()
        const tomorrow = new Date(today)
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
        console.log(dayName)
        if(dayName != 0 && dayName != 6){
            datesArr.push(dataDate);
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
    console.log(datesArr);
}


var exemple = new Date(firstDay);
console.log(exemple)

 