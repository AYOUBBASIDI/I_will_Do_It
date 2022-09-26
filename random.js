var randomName = document.getElementById("randomName");
var randomSubject = document.getElementById("randomSubject");
var refresh = document.getElementById("refresh");
var spinbtn = document.getElementById("spinbtn");
var generate = document.getElementById("generate");
var names =JSON.parse(localStorage.getItem("names"));
var subjects =JSON.parse(localStorage.getItem("subjects"));
var nameCount= names.length;
var subjectCount= subjects.length;
var namesArr = [];
var subjectsArr = [];
var config = JSON.parse(localStorage.getItem("config"));
var randomlySub = config.randomSubject;
var number = 0;
var toComplet = 0;
var diff = subjects.length - names.length;


if(names.length < subjects.length){
    toComplet = 1
}

randomName.innerHTML = names[0];
randomSubject.innerHTML = subjects[0];

function spinn(){
    spinbtn.setAttribute("disabled", ""); 
    if(names.length === 0){
        finish();
    }else{
        spinnName()
        setTimeout(function(){
        if(randomlySub){
            spinnSubject();
        }else{
            refreshSub();
        }
        }, 3000);
    }
}

function spinnName(){
    var randTimer = setInterval(function(){ randomName.innerHTML = names[Math.floor(Math.random() * nameCount)]; }, 100);
        setTimeout(function(){
        clearInterval(randTimer);
        getname();
    }, 3000);

}

function spinnSubject(){
    var randTimer = setInterval(function(){ randomSubject.innerHTML = subjects[Math.floor(Math.random() * subjectCount)]; }, 100);
        setTimeout(function(){
        clearInterval(randTimer);
        getsubject();
    }, 3000);
    spinbtn.removeAttribute("disabled"); 
}

function getname(){
    var index = names.indexOf(randomName.innerHTML);
    names.splice(index, 1);
    nameCount = names.length;
    namesArr.push(randomName.innerHTML);
    putName();
}

function getsubject(){
    var index = subjects.indexOf(randomSubject.innerHTML);
    subjects.splice(index, 1);
    subjectCount = subjects.length;
    subjectsArr.push(randomSubject.innerHTML);
    putSubject();
}

function refreshSub(){
    randomSubject.innerHTML = subjects[number];
    number++ ;
    spinbtn.removeAttribute("disabled"); 
    putSubject();
}

function finish(){
    if(toComplet){
        complete();
    }
    if(randomlySub){
        console.log(namesArr);
        console.log(subjectsArr);
    }else{
        console.log(namesArr);
        console.log(subjects);
    }
    refresh.style.display = "block";
    spinbtn.style.display = "none";
    generate.style.display = "block";
}

function putName(){
    var name = randomName.innerHTML; 
    var person = document.createElement("li");
    person.textContent = name;
    document.getElementById("randomNamesList").appendChild(person);
}


function putSubject(){
    var subject = randomSubject.innerHTML; 
    var sujet = document.createElement("li");
    sujet.textContent = subject;
    document.getElementById("randomSubjectsList").appendChild(sujet);
}

function complete(){
    for(i = 0 ; i < diff ; i++){
        var sub = subjects[i];
        console.log(sub);
        var name = namesArr[i];
        console.log(name)
        if(randomlySub){
            subjectsArr.push(sub);
        }
        namesArr.push(name);
        completPut(sub,name);
    }
}

function completPut(sub,name){
    var sujet = document.createElement("li");
    sujet.textContent = sub;
    document.getElementById("randomSubjectsList").appendChild(sujet);
    var person = document.createElement("li");
    person.textContent = name;
    document.getElementById("randomNamesList").appendChild(person);
}


function download(){
    if(randomlySub){   
        localStorage.setItem("DataSubjects", JSON.stringify(subjectsArr));
    }else{
        localStorage.setItem("DataSubjects", JSON.stringify(subjects));
    }
    localStorage.setItem("dataNames", JSON.stringify(namesArr));
    window.location = "./download.html"
}

