
// whatever you add in the text box has id = input-box and in the ul has id = list-container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//to add task mentioned in text box
function addTask(){
    // if you click on add button without giving any input it will show alert
    if(inputBox.value === ''){
        alert('You must write something!');

    }
    
    else{
        //create list element and in that li add the value mentioned in 
        let li = document.createElement("li");
        // in that li add the value mentioned in the text box
        li.innerHTML = inputBox.value;
        //append that li inside ul tag
        listContainer.appendChild(li);

        //same as above but this will add "x" in the added element
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    //it is written so that after you add text the input box clears
    inputBox.value = "";
    
    saveData();
}

//events to take place once you click on the added  task
listContainer.addEventListener("click",function(e){
    //if you've clicked on the task then it will strikeout the entered task 
if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveData();
}
//if you click on the span tag it will remove the task from the list
else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
}
}, false);

//it saves the data on the localstorage so that even if you refresh your browser the data will be there
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

//once you refresh the browser the entered data must be as it is to acheive that below finc is used
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();