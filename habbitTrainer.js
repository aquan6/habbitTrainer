/*javascript for the habbit trainer 
 * Author: Andrew Quan
 * Email: aquan@bu.edu
*/

//initailize values 
var index = 1; //the task id
var totalCaught = 0; //how many pokemon have been caught
var uniquePokemon = 0; //how many unique pokemon caught

function addTDLTask() {
	var input = document.getElementById("tdlTextField").value;
    if(input == "") {
    	console.log("No input!"); //e.g. don't do anything
    }
    else { //make the task element
    	
    	var newTask = document.createElement("div");

        //make the input checkbox
    	var t = document.createElement("input");
    	t.type = "checkbox";
        t.onclick = "finishTask(taskId)";
        t.setAttribute("onClick", "finishTask("+index+");" );
    	var textValue = document.createTextNode(input);
    	newTask.appendChild(t); 
        newTask.appendChild(textValue);

        //assign attributes & update id
		newTask.className = "tdlTask";
        var taskId = "task" + index;
        index++;
        newTask.id = taskId;
        

		var parent = document.getElementById("ToDoListContent");
    	parent.appendChild(newTask);
    }
}

function finishTask(taskId){
    /*remove the element */
    var taskId = "task" + taskId;
    var removing = document.getElementById(taskId);
    removing.parentNode.removeChild(removing);

    /*Get a pokemon!*/
    var randomPokemon = Math.floor(Math.random() * 300) +1;     
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/";
  
    $.getJSON(pokeURL, function(data){
        //console.log(data);
        //console.log(JSON.stringify(data, null, "  "));
        //console.log(data["sprites"]["front_default"]);

        //get the name and imgURL from the json
        var pokemonName = data["name"];
        var imgURL = data["sprites"]["front_default"];

        //create an image html object and append to the page
        var image = document.createElement("img");
        image.src = imgURL;
        image.alt = "could not load pokemon";
        image.id = "pokemonImage";
        var pokemonpopup = document.getElementById("thePicture");
        pokemonpopup.innerHTML= ''; //clear old image
        pokemonpopup.appendChild(image);

        //create the caption and append it to the page
        var captionText ="A wild " + pokemonName + " has appeared!";
        var caption = document.createTextNode(captionText);
        var captionDiv = document.getElementById("radarCaption");
        captionDiv.innerHTML= '';
        captionDiv.appendChild(caption);

    });

}
