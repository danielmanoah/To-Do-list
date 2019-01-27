var all_notes = [];

function backUp() {
var item = JSON.parse(localStorage.getItem("items"));
    if ( item !== null ) {
        all_notes = item;
    } else {
        console.log('localStorage is empty.')
    }
}

backUp();
function main() {

    if ( all_notes.length > 0 ) {
        
        for (i=0; i<all_notes.length; i++) {

            var theNote = document.createElement("DIV");
            theNote.setAttribute("id", "noteId");
            theNote.setAttribute("class", "note");

            var x_btn = document.createElement("I");
            x_btn.classList.add("far", "fa-times-circle", "x", "remove");
            x_btn.setAttribute('id','item'+myId);
            x_btn.setAttribute('onClick',"del_item(this.parentNode.id)");
            theNote.appendChild(x_btn);

            var para = document.createElement("P");
            para.setAttribute("class", "noteText");
            var note_text = document.createTextNode(all_notes[i].text);
            para.appendChild(note_text); 
            theNote.appendChild(para);

            var span = document.createElement("span");
            span.setAttribute("class", "noteDate");
            var dateIcon = document.createElement("I");
            dateIcon.classList.add("far", "fa-calendar");
            span.appendChild(dateIcon);
            var timeDate = document.createTextNode(all_notes[i].date);
            span.appendChild(timeDate);

            timeIcon = document.createElement("I");
            timeIcon.classList.add("far", "fa-clock");
            span.appendChild(timeIcon);
            var timeText = document.createTextNode(all_notes[i].time);
            span.appendChild(timeText);

            myId += 1;
            theNote.appendChild(span);
            
            document.getElementById('noteContainer').appendChild(theNote);
      }

    } else {
        document.getElementById('noteContainer').innerHTML = "No notes ";
    }

}
main();

var noteText = document.forms["toDoList"]["noteText"]; 
var noteDate = document.forms["toDoList"]["noteDate"]; 
var noteTime = document.forms["toDoList"]["noteTime"]; 
var saveNote = document.getElementById("saveNote"); 
var clear_Form = document.getElementById("clearForm");
var messege = document.getElementById("messege"); 


function noteObj(text, date, time, id) {
    var notes = {
        text : text,
        date : date,
        time : time,
        id : id
    }
    return notes;
}

var myId = 0;

saveNote.addEventListener("click", newNote);
clear_Form.addEventListener("click", clearForm);

function newNote() {

    messege.style.display = 'block';
    var selectedDate = new Date(noteDate.value);
    var now = new Date();

    if ( noteText.value === "" || noteDate.value === "" ) {
        noteText.style = "border:2px solid red; -webkit-animation: bounce 0.8s;";
        noteDate.style = "border:2px solid red; -webkit-animation: bounce 0.8s;";
        messege.innerHTML = "Please fill in all fields";
    } else if ( selectedDate < now ) {
        noteText.style.border = "none";
        noteDate.style.border = "2px solid red";
        noteTime.style.border = "none";
        messege.innerHTML = "Please select a future date";
    } else {

        all_notes.push(noteObj(noteText.value, noteDate.value, noteTime.value, myId));
        localStorage.setItem("items", JSON.stringify(all_notes));
        document.getElementById('noteContainer').innerHTML = "";
       

        for (i=0; i<all_notes.length; i++) {

            var theNote = document.createElement("DIV");
            theNote.setAttribute("id", "noteId");
            theNote.setAttribute("class", "note");

            var x_btn = document.createElement("I");
            x_btn.classList.add("far", "fa-times-circle", "x", "remove");
            x_btn.setAttribute('id','item'+myId);
            x_btn.setAttribute('onClick',"del_item(this.parentNode.id)");
            theNote.appendChild(x_btn);

            var para = document.createElement("P");
            para.setAttribute("class", "noteText");
            var note_text = document.createTextNode(all_notes[i].text);
            para.appendChild(note_text); 
            theNote.appendChild(para);

            var span = document.createElement("span");
            span.setAttribute("class", "noteDate");
            var dateIcon = document.createElement("I");
            dateIcon.classList.add("far", "fa-calendar");
            span.appendChild(dateIcon);
            var timeDate = document.createTextNode(all_notes[i].date);
            span.appendChild(timeDate);

            timeIcon = document.createElement("I");
            timeIcon.classList.add("far", "fa-clock");
            span.appendChild(timeIcon);
            var timeText = document.createTextNode(all_notes[i].time);
            span.appendChild(timeText);

            myId += 1;
            theNote.appendChild(span);
            
            document.getElementById('noteContainer').appendChild(theNote);
        }

    }

}

function del_item(itemid) {
    all_notes.splice(itemid, 1);
    localStorage.setItem("items", JSON.stringify(all_notes));
    document.getElementById('noteContainer').innerHTML = "";
    location.reload();
}


function clearForm() {
    noteText.value = "";
    noteDate.value = "";
    noteTime.value = "";

    messege.innerHTML = 'The form has been successfully removed';
    setTimeout(function(){
        messege.style.display = '';
    }, 1000); return false;
}


function clearStorage() {
    localStorage.clear();
    location.reload();
}

console.log(all_notes);