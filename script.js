// VARIABLES 
let titleA = document.querySelector('#title');
let noteContentArea = document.querySelector('#note');
let addBtn = document.querySelector('#addBtn');
let notesContainer = document.querySelector('#notesContainer');
let addMark = document.querySelector('#addMark');

// DATABASE
let noteDatabse = [];

addMark.addEventListener('click', ()=>{
  document.querySelector('.form').classList.toggle('active');
});

// ADD BUTTON FUNCTIONS
function addNote(){
  // READ TITLE AND NOTE VALUE
  let titleVal = titleA.value;
  let noteVal = noteContentArea.value;
  
  // VERIFY NOTE AND TITLE 
  if (titleVal.trim() === "") {
    alert('Enter some title bro');
    return;
  };
  
  if (noteVal.trim() === "") {
    alert('Enter some Note bro');
    return;
  };
   
  // CREATE A OBJECT
  let note = {
    id: Date.now(),
    notetitle: titleVal,
    noteContent: noteVal
  };
  
  // PUSH IN DATABASE
  noteDatabse.push(note);
  document.querySelector('.form').classList.remove('active');
  // CLEAR INPUT
  titleA.value = "";
  noteContentArea.value = "";
  
  // RENDER
  render(noteDatabse);
};

// RENDER FUNCTION 
function render(arr) {
  // CLEAR OLD CARDS
  notesContainer.innerHTML = "";
  // CREATING FOR EACH ELEMENT
  arr.forEach(elem => {
    // CARD
    const card = document.createElement("div");
    card.classList.add("note-card");
    // TITLE
    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = elem.notetitle;
    // CONTENT
    const text = document.createElement("p");
    text.classList.add("text");
    text.textContent = elem.noteContent;
    
    const actions = document.createElement("div");
    actions.classList.add("actions");
    // EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.textContent = "Edit";
    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";
    
    // EVENT LISTENER 
    editBtn.addEventListener('click', (evt)=>{
      evt.stopPropagation();
      
      let editTitle = prompt('Enter your new Title');
      let texteditContent = prompt('Enter your new Content');
      
      // EDIT TITLE VERIFY 
      if(editTitle === null || editTitle.trim() === "") return;

      // EDIT CONTENT VERIFY
      if(texteditContent === null || texteditContent.trim() === "") return;
      
      noteDatabse = noteDatabse.map(note => {
        if(note.id === elem.id){
          return {
            ...note,
            notetitle: editTitle,
            noteContent: texteditContent
          };
        }
        return note;
      });
      render(noteDatabse);
    });
    
    deleteBtn.addEventListener('click', ()=>{
      deletefnc(elem.id);
      render(noteDatabse);
    });
    
    actions.append(editBtn, deleteBtn);
    card.append(title, text, actions);
    
    notesContainer.appendChild(card);
  });
};

// ADD BUTTON
addBtn.addEventListener('click',addNote);

// DELETE BUTTON
function deletefnc(id){
  noteDatabse = noteDatabse.filter(note => note.id !== id);
};
