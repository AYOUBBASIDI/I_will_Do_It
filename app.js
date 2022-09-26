var load = document.getElementById("load"); 
var app = document.getElementById("app"); 
var namesNumber = 0

function loading(){
    load.style.display = "block";
    setTimeout(function(){
    load.style.display = "none";
    app.style.display = "flex";
    }, 2000);
}

function newSpinning(){
    window.location.replace("./data.html");
}


document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
})


function newPerson() {
  var person = document.createElement("li");

  person.setAttribute("class", "name");

  person.setAttribute("placeholder", "Enter new person");

  person.setAttribute("contenteditable", "true");

  document.getElementById("dataList").appendChild(person);
}

function newSubject() {
  var subject = document.createElement("li");

  subject.setAttribute("class", "subject");

  subject.setAttribute("placeholder", "Enter new subject");

  subject.setAttribute("contenteditable", "true");

  document.getElementById("subjectList").appendChild(subject);
}

function next(){
      var lists = document.getElementsByClassName('name');
      namesNumber = lists.length;
      if(namesNumber > 5){
        for(var i = 0 ; i < namesNumber-5 ; i++){
          addSubject(i+6);
        }
      }
      var result = checkData("name");
      if(result){
        alert("Some data is empty! Check the list .");
      }else{
        changeTable();
      }
      
}

function checkData(type){
    var lists = document.getElementsByClassName(type);
    number = lists.length;
    for(var i= 0 ; i < number; i++){
      if(lists[i].innerHTML == ""){
        var result = 1
      }  
    }
    return result;
}

function deletePerson(){
  var lists = document.getElementsByClassName('name');
  if(lists.length > 5){
    var select = document.getElementById('dataList');
    select.removeChild(select.lastChild);
  }else{
    alert("Minimum person is 5");
  }
}
function deleteSubject(){
  var lists = document.getElementsByClassName('subject');
  console.log(lists.length)
  if(lists.length > namesNumber){
    var select = document.getElementById('subjectList');
    select.removeChild(select.lastChild);
  }else{
    alert("Minimum person is " + namesNumber);
  }
}


function changeTable(){
  document.getElementById("names").style.display = "none";
  document.getElementById("subjects").style.display = "flex";
}

function addSubject(number){
  var subject = document.createElement("li");

  subject.setAttribute("class", "subject");

  subject.setAttribute("placeholder", "Enter subject " + number + "...");

  subject.setAttribute("contenteditable", "true");

  document.getElementById("subjectList").appendChild(subject);
}

function save(){
  var subjectLists = document.getElementsByClassName('subject');
  var namesLists = document.getElementsByClassName('name');
  var subjects = [];
  var names = [];
  for (var i = 0; i < subjectLists.length; i++) {
    subjects.push(subjectLists[i].innerHTML);
  }
  for (var i = 0; i < namesLists.length; i++) {
    names.push(namesLists[i].innerHTML);
  }
  localStorage.setItem("names", JSON.stringify(names));
  localStorage.setItem("subjects", JSON.stringify(subjects));
  var result = checkData("subject");
  if(result){
    alert("Some data is empty! Check the list .");
  }else{
    window.location = "/check.html"
  }
  
}


loading();
