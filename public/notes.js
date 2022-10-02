const showNote = document.getElementById('showNote');

const noteSubmit = document.getElementById('noteSubmit');
const addClass = document.getElementById('addClass');
const textNote = document.getElementById('textNote');
const due = document.getElementById('due');

const mainList = document.getElementById('mainList');

let notes = localStorage.getItem('notes');
if (notes == null) {
  notesObj = [];
}
else {
  notesObj = JSON.parse(notes);
}

render();
noteSubmit.onclick = function () {
  displayNotes();
}

function render() {
  mainList.innerHTML = '';
  if (notesObj.length != 0) {

    let htmlData = '';
    notesObj.forEach((element) => {
  
        const newNote = document.createElement('div');
        newNote.classList.add('main');    
     
        if(element.editD == "false"){
          
        htmlData = ` <div class="main mt-[20px] flex-1 z-9 sm:w-[300px] h-[220px] md:w-[380px] ">
        <div class="flex justify-end items-center h-10 bg-gray-800">
        <img  id=${element.id}  onclick="save(this.id)" class="cursor-pointer mr-2 h-[35px] hover:rotate-180 savei" src="save.png">
        <img id=${element.id} onclick="editNotes(this.id)" class="cursor-pointer mr-2 h-[35px] hover:rotate-180 editi" src="edit.png">
        <img onclick="removeNotes(this.id)" id=${element.id} class="cursor-pointer mr-2 h-[35px] hover:rotate-180 deli" src="delete.png">
        </div>
        <div class="h-[210px] bg-white w-full">
        <textarea id=${element.id} onchange="update(this.value)" class="mainText first-line:homeText h-[210px] w-full resize-none outline-none p-[10px]">${element.note}</textarea>
        </div>
        </div>`
        saveNotes();
        }
      else
      {
      htmlData = ` <div class="main mt-[20px] flex-1 h-[220px] sm:w-[300px] md:w-[380px] bg-zinc-200">
      <div class="flex justify-end items-center h-10 bg-gray-800">
      <img id=${element.id} onclick="save(this.id)" class="cursor-pointer savei hover:rotate-180 mr-2 h-[35px]" src="save.png">
      <img id=${element.id} onclick="editNotes(this.id)" class="cursor-pointer hover:rotate-180 mr-2 h-[35px] editi" src="edit.png">
      <img onclick="removeNotes(this.id)" id=${element.id}  class="cursor-pointer hover:rotate-180 mr-2 h-[35px] deli" src="delete.png">  
      </div>
      <div class="h-[210px] w-full">
        <textarea id=${element.id} readOnly  class="mainText first-line:homeText  h-[210px] w-full resize-none outline-none p-[10px]">${element.note}</textarea>
      </div>
    </div>`
    }
        newNote.insertAdjacentHTML('afterbegin', htmlData);
        mainList.appendChild(newNote);  
    })
  }
}

function displayNotes() {
  addClass.style.display = 'none';
  const noteData = textNote.value;

  const key = "" + new Date().getTime();
  
  notesObj.push({
    note: noteData,
    id: key,
    editD : "true"
  });
  textNote.value = '';
  saveNotes();
  render();
}

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notesObj));
}
let comp;
function save(saveId){
  comp = saveId;
  notesObj.filter((ele)=>{
     if(saveId == ele.id)
     {      
         ele.editD = "true";
         saveNotes();
         render();
     }
  })
}

function update(updateId){
  
 console.log(updateId);
     notesObj.filter((element,index)=>{
        if(comp == element.id)
        {
         element.note = updateId;
        }   
     })
 
     saveNotes();
     render();
}

function editNotes(editId) {  
  comp = editId;
  notesObj.filter((element) => {
    if (editId == element.id) {  
      element.editD = "false";
      saveNotes();
      render();
    }
  })
}

function removeNotes(Deleteid) {
  notesObj = notesObj.filter((ele) => {
    if (ele.id == Deleteid) {
      return false;
    }
    else {
      return true;
    }
  })
  saveNotes();
  render();
}

showNote.onclick = function () {
  addClass.style.display = "block";
}