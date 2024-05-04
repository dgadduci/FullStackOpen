//Array that will contain the note objects displayed in the <ul> list
var notes = [];

//Generates a list of notes(client side)
var redrawNotes = function () {
  var ul = document.createElement("ul");
  ul.setAttribute("class", "notes");

  notes.forEach(function (note) {
    var li = document.createElement("li");

    ul.appendChild(li);
    li.appendChild(document.createTextNode(note.content));
  });

  var notesElement = document.getElementById("notes");
  if (notesElement.hasChildNodes()) {
    notesElement.removeChild(notesElement.childNodes[0]);
  }
  notesElement.appendChild(ul);
};

//HTTP object used throughout the script
var xhttp = new XMLHttpRequest();

//Callback called when the JSON with data is obtained
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    notes = JSON.parse(this.responseText);
    //Generates initial list of notes 
    redrawNotes();
  }
};

//Requests data of existing notes from the server (will return them to the callback onreadystatechange())
xhttp.open("GET", "/exampleapp/data.json", true);
xhttp.send();

//send new note to the server
var sendToServer = function (note) {
  var xhttpForPost = new XMLHttpRequest();
  //Callback called when the new note is added in the server
  xhttpForPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      //display response from server 
      console.log(this.responseText);
    }
  };
  //send JSON new note to the server
  xhttpForPost.open("POST", "/exampleapp/new_note_spa", true);
  xhttpForPost.setRequestHeader("Content-type", "application/json");
  xhttpForPost.send(JSON.stringify(note));
};

//Start: when HTML loading (including CSS and script) is complete, it starts here
window.onload = function (e) {
  //"Form for entering a new note
  var form = document.getElementById("notes_form");

  //Method called when the button to create a new note is clicked.
  form.onsubmit = function (e) {
    //Prevents the default action from being triggered
    e.preventDefault();

    //Instance object of the new note
    var note = {
      content: e.target.elements[0].value,
      date: new Date(),
    };

    //Adds the new note to the array of notes
    notes.push(note);
    e.target.elements[0].value = "";
    //Regenerates the list of notes (will include the new note)
    redrawNotes();
    //Sends the new note to the server
    sendToServer(note);
  };
};
