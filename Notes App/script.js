const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");


//show the stored notes
function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();

//once page is reloaded the history should appear
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}


//whatever is commented in index.html is created here
createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className= "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    
});

//when you click on delete img, it will remove p tag but store the data else if you are writing
// in p tag it show show the stored data
notesContainer.addEventListener("click", function(e){
        if(e.target.tagName === "IMG"){
            e.target.parentElement.remove();
             updateStorage();
        }
        else if (e.target.tagName === "P"){
            notes = document.querySelectorAll(".input-box");
            notes.forEach(nt =>{
                nt.onkeyup = function(){
                   updateStorage();
                }
            })
        }
});

//when you press enter break line sould come
document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})