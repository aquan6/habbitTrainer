var toDoListTasks = [];
var dailyTasks = [];

var pokemon = [];

function addTDLTask() {
	var input = document.getElementById("tdlTextField").value;
    if(input == "") {
    	console.log("No input!"); //e.g. don't do anything
    }
    else { //make the task element
    	
    	var newTask = document.createElement("div");
    	var t = document.createElement("input");
    	t.type = "checkbox";
    	var textField = document.createTextNode(input);
    	t.appendChild(textField);
    	newTask.appendChild(t); 
		newTask.id = "tdlTask";

		var parent = document.getElementById("ToDoListContent");
    	parent.appendChild(newTask);

    }
}