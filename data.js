
function Cancel(){
    var content = confirm("Are you sure , You will lose everything");
    if (content === true) {
        window.location = "./data.html"
    } else {
        console.log("cancel")
    }
    
}

function next(){
    window.location = "./config.html"
}

function today(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("datefield").setAttribute("min", today);
}
today();

function getData(){
    var className = document.querySelector('input[name="className"]').value;
    var firstDay = document.querySelector('input[name="firstDay"]').value;
    var subjectConfig = document.querySelector('input[name="subject"]:checked').value;
    var config = {
        "className" : className ,
        "firstDay" : firstDay ,
        "randomSubject" : subjectConfig ,
    }
    console.log(config);
    localStorage.setItem("config" , JSON.stringify(config));
    toSpinn();
}

function toSpinn(){
    window.location = "./random.html"
}