var toDoListTasks = [];
var dailyTasks = [];

function addTDLTask() {
	var input = document.getElementById("tdlTextField").value;
    if(input == "") {
    	console.log("No input!"); //e.g. don't do anything
    }
    else { //make the task element
    	var parent = document.getElementById("ToDoListContent");
    	var newTask = document.createElement("div");
    	var t = document.createTextNode("I'm a new Node!");       // Create a text node
		newTask.appendChild(t); 
    	parent.appendChild(newTask);
    }
}