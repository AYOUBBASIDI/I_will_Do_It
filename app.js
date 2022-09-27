var load = document.getElementById("load"); 
var app = document.getElementById("app"); 
var namesNumber = 0

//function to stop loading after 2s and block the start button
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

//to stop content editable from take a break (new line) (we need just one line)
document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
})

//to create new person we use createElement func (persons section)
function newPerson() {
  var person = document.createElement("li");

  person.setAttribute("class", "name");

  person.setAttribute("placeholder", "Enter new person");

  person.setAttribute("contenteditable", "true");

  document.getElementById("dataList").appendChild(person);
}

//to create new person we use createElement func (subjects section)
function newSubject() {
  var subject = document.createElement("li");

  subject.setAttribute("class", "subject");

  subject.setAttribute("placeholder", "Enter new subject");

  subject.setAttribute("contenteditable", "true");

  document.getElementById("subjectList").appendChild(subject);
}

// here we check the nbr of persons if bigger than min(5) 
// true = create (diff) subjects 
// (ex : 7 person - 5 = 2 ; => 2 subjects input added)  
function next(){
      var lists = document.getElementsByClassName('name');
      namesNumber = lists.length;
      if(namesNumber > 5){
        for(var i = 0 ; i < namesNumber-5 ; i++){
          addSubject(i+6);
        }
      }
      //to check if som input is empty we call checkData func (name == list of person)
      var result = checkData("name");
      if(result){
        alert("Some data is empty! Check the list .");
      }else{
        // if false we change the table (5 person - 5 = 0 => 0 subjects added)
        changeTable();
      }
      
}
// function checking inputs 
// type ( "name" || "subjects")
// name == list of person
// subjects == list of subjects
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
// always we delete last chlid from list of persons if limit is (> 5)
function deletePerson(){
  var lists = document.getElementsByClassName('name');
  if(lists.length > 5){
    var select = document.getElementById('dataList');
    select.removeChild(select.lastChild);
  }else{
    alert("Minimum person is 5");
  }
}
// always we delete last chlid from list of subjects if limit is (> 5)
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

//this function is called from next function the number params to display number of subject in placeholder (ex : Enter Subject 6)
function addSubject(number){
  var subject = document.createElement("li");

  subject.setAttribute("class", "subject");

  subject.setAttribute("placeholder", "Enter subject " + number + "...");

  subject.setAttribute("contenteditable", "true");

  document.getElementById("subjectList").appendChild(subject);
}

// important function
// to remplir the final data in new arrays 
// and save them in local storage
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
  //we call the checkdata funct to check subjects list if any input is empty
  if(result){
    alert("Some data is empty! Check the list .");
  }else{
    //everyting ok 
    window.location = "/check.html"
  }
  
}


loading();
