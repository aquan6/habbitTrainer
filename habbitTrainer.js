/*javascript for the habbit trainer 
 * Author: Andrew Quan
 * Email: aquan@bu.edu
*/

//initailize values 
var index = 1; //the task id
var totalCaught = 0; //how many pokemon have been caught
var uniquePokemon = 0; //how many unique pokemon caught

var currentTaskCount = 0; //how many we currently have
var MAX_TASK_COUNT = 8; //the number before the taskbar overflows

var defaultColor = 0; //to alternate red and green

let pokemonMap = new Map(); //map containing the pokedex

//on creation of a task, this is called. 
function addTDLTask() {
    //get values from user
	var input = document.getElementById("tdlTextField").value;
    var difficulty = document.getElementById("selectDifficulty").value;

    if(input == "") {
    	console.log("No input!"); //e.g. don't do anything
    }
    else { //make the task element
    	if(currentTaskCount <8) {
        	var newTask = document.createElement("div");

            //make the input checkbox
        	var t = document.createElement("input");
        	t.type = "checkbox";
            t.onclick = "finishTask(taskId)";
            t.setAttribute("onClick", "finishTask("+index+");" );
        	var textValue = document.createTextNode("("+difficulty+"): "+input);
        	newTask.appendChild(t); 
            newTask.appendChild(textValue);

            //assign attributes & update id
    		newTask.className = "tdlTask";
            var taskId = "task" + index;
            index++;
            newTask.id = taskId;
//->        //Add a field to the task! 
            newTask.difficulty = difficulty;

            //just to make the colors more pretty
            if(defaultColor == 0) {
                newTask.style.backgroundColor = "#9DC462";
                defaultColor = 1;
            }
            else if (defaultColor == 1) {
                newTask.style.backgroundColor = "#D46A6A";
                defaultColor = 0;
            }
            
    		var parent = document.getElementById("ToDoListContent");
        	parent.appendChild(newTask);
            currentTaskCount++;
        }
        else { //there are too many tasks, put error onto the radar
            //create radar image
            var image = document.createElement("img");
            image.src = "assets/defaultRadar.png";
            image.alt = "could not load default background";
            image.id = "pokemonImage";
            var pokemonpopup = document.getElementById("thePicture");
            pokemonpopup.innerHTML= ''; //clear old image
            pokemonpopup.appendChild(image);

            //add caption
            var captionText ="Finish your tasks before moving on!";
            var caption = document.createTextNode(captionText);
            var captionDiv = document.getElementById("radarCaption");
            captionDiv.innerHTML= '';
            captionDiv.appendChild(caption);
        }
    }
}

function finishTask(taskId){
    /*remove the element */
    var taskId = "task" + taskId;
    var removing = document.getElementById(taskId);
   
    //get the difficulty from the task and use it to calculate
    //probability of catching a pokemon
    var difficulty = parseInt(removing.difficulty.charAt(0));
    
    //remove and update To Do List
    removing.parentNode.removeChild(removing);
    currentTaskCount--;

    /*See if they got a pokemon!*/
    var testCatch = Math.floor(Math.random()* 4 ) + 1; //returns 1 to 4
    if(testCatch <= difficulty) {
        /*Get a pokemon!*/
        totalCaught++; //we caught one!
        var randomPokemon = Math.floor(Math.random() * 300) + 1; 
        var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + randomPokemon + "/";
      
        $.getJSON(pokeURL, function(data){ //call the api
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

            //now update the pokemon Map for our pokedex
            if(pokemonMap.get(pokemonName) != undefined) {
                //console.log("got duplicate!")
                var curCount = pokemonMap.get(pokemonName);
                pokemonMap.set(pokemonName, curCount+1);

                //update pokedex count
                var existingPokemon = document.getElementById(pokemonName);
                var caption = document.createElement("figcaption");
                caption.appendChild(document.createTextNode("" + pokemonName + " count: " +pokemonMap.get(pokemonName)));
                existingPokemon.removeChild(existingPokemon.childNodes[1]);
                existingPokemon.appendChild(caption);
            }
            else { //set it if it isnt there yet
                pokemonMap.set(pokemonName,1); 
                uniquePokemon++;

                //add to the pokedex
                var image = document.createElement("img");
                image.src = imgURL;
                image.alt = "could not load pokemon";
                //image.id = "pokemonImage"; dont need styling to make smaller
                
                var caption = document.createElement("figcaption");
                caption.appendChild(document.createTextNode("" + pokemonName + " count: 1"));
                caption.id= pokemonName + "Caption";

                var figure = document.createElement("figure");
                figure.appendChild(image);
                figure.appendChild(caption);
                figure.id=pokemonName;

                var pokedexDiv = document.getElementById("PokedexContent");
                pokedexDiv.appendChild(figure);
            }
            updateCounts();
        });
    }
    else { //no pokemon was found because difficulty not high enough
        var image = document.createElement("img");
        image.src = "assets/brock.jpg";
        image.alt = "could not load brock";
        image.id = "pokemonImage";
        var pokemonpopup = document.getElementById("thePicture");
        pokemonpopup.innerHTML= ''; //clear old image
        pokemonpopup.appendChild(image);

        //add caption
        var captionText ="Great work! Keep it up!";
        var caption = document.createTextNode(captionText);
        var captionDiv = document.getElementById("radarCaption");
        captionDiv.innerHTML= '';
        captionDiv.appendChild(caption);
    }   
}

//update values in the nav bar
function updateCounts() {
    var uniqueDiv = document.getElementById("uniqueCount");
    uniqueDiv.innerHTML = "Unique: " + uniquePokemon;
    var totalDiv = document.getElementById("totalCount");
    totalDiv.innerHTML = "Total: " + totalCaught;
}
