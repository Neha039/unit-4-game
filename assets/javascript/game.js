//Function used to make sure html loads completely before loading the JS
$(document).ready(function(){

    //Global Variables being declared and initialized
    var defendID = "", 
    attackID = "", 
    attackHP = 0, 
    defendHP = 0, 
    attackP = 0, 
    
    //Variable of an array of objects
    characterList = [
    OWKenobi = {
        name: "Obi Wan Kenobi",
        hPoint:120,
        aPower: 6,
        counterAP: 10,
        img: "../images/OWKenobi.jpg",
    },
    luke = {
        name: "Luke Skywalker",
        hPoint:100,
        aPower:4,
        counterAP:5,
        img: "../images/Luke.jpg",
    },
    darthS = {
        name: "Darth Sidicious",
        hPoint:150,
        aPower:12,
        counterAP:20,
        img: "../images/Dsidious.jpg",
    },
    darthM = {
        name: "Darth Maul",
        hPoint:180,
        aPower:20,
        counterAP: 25,
        img: "../images/Dmaul.jpg",
    },
    ],

    eCount = characterList.length - 1;

    //Functionn for the game to start and restart
    function newGame(){
        //Make sure the divs are empty
        $("#character-options").empty();
        $("#yourchar").empty();
        $("#topMsg").text("Select an option");
        $("#msg").empty();
        $("defender").empty();
    }

    //For loop to go through the array of characterList to create each option for the user
    for(var i = 0; i < characterList.length; i++){
        //Create another div for character list and id
        var div = $("<div>").addClass("character").attr("id", i);
        //Append the new div
        $("#character-options").append(div);

        //Inside the new div append to add character's name, image and its health points
        div.append($("<img>").attr("src", "assets/images/" + characterList[i]["img"]));
		div.append($("<p>").text(characterList[i]["name"]));
		div.append($("<p>").html("Health Points: <span>" + characterList[i]["hPoint"] + "</span>"))
		div.append($("<p>").html("Attack Power: " + characterList[i]["aPower"]));
        div.append($("<p>").html("Counter Attack: " + characterList[i]["counterAP"]))
    }
    //Add an onclick event to the character options
    attachOnClick();

//Progress Bar for the defender and attacker
function addProgressBar(className){
    var progressbar = $("<div>").addClass("progress");
	var div = $("<div>").addClass("progress-bar progress-bar-success").text("100%");
	progressbar.append(div);
	$(className).append(progressbar);
}

//Calling function to create a new game
newGame();
var msg = $("#msg");

//Start a new game and hide the restart button
$("#restart").on("click", function(){
    newGame();
    $(this).css("display", "none");
});

//Creating onclick and character elements
function attachOnClick(){
    $(".character").on("click", function(){
        //Character that has been clicked
        var currentCharacter = $(this);

        //If there is no attacker
        if(attackID == ""){
            attackID = currentCharacter.attr("id"); //get attacker id
            attackHP = character[attackID].hPoint;    //get attacker heath points
            currentCharacter.addClass("attacker");    //add class attacker
            currentCharacter.off("click"); //remove click event from this character

            //append the character to 'your character'(attacker) zone
            $("#yourChar").append(currentCharacter); 

            //add progress bar to attacker
            addProgressBar(".attacker");

            $("#topMsg").text("Enemies Available To Attack");

            //if there is not a defender
        }else if(defendID == ""){
            defendID = currentCharacter.attr("id"); //get enemy id
            defendHP = character[defenderId].HP;    //get enemy heath points
            currentCharacter.addClass("defender");    //add class defender
            currentCharacter.off("click"); //remove click event from this character

            //append character to defender zone
            $("#defender").append(currentCharacter);  

            //add progress bar to defender
            addProgressBar(".defender");
            
            $("#attack").css("display", "inline"); //display button attack
            msg.empty(); //clean mesages
        }
    });
}

    })


	
			//if there is not a attacker
			

	//button attack click
	$("#attack").click(function(){
		
		//increase attacker's attackPower
		aPower += character[attackID]["attackPower"];
		defendHP -= aPower; //decrease defender hp

		//if defender hp is less than 1
		if(defendHP <= 0){
			$("#" + defendID).remove(); //remove the defender
			$("#attack").css("display", "none"); //hide button attack

			eCount --; //decrease enemies count

			//if there is not more enemies, you won
			if(eCount == 0){
				msg.html("<p>You Won!!!</p>");
				$("#restart").css("display", "block");
			}else{ //if still more enemies show a message and clean defenderId variable
				msg.html("<p>You have defeated " + character[defendID].name + ", you can choose to fight another enemy.</p>");
				defendID = "";
			}

		}else{ //if defender still alive
			$(".defender span").text(defendHP); //update defender hp on screen

			//update defender progres bar
			var defHpPercent = defendHP * 100 / character[defendID].HP;
			$(".defender .progress-bar").width(defHpPercent + "%").text(Math.round(defHpPercent) + "%");


			attackHP -= character[defendID].counterAP; //decrease attacker hp
			$(".attacker span").text(attackHP); //update attacker hp on screen
		
			//update attacker progress bar
			var attHpPercent = attackHP * 100 / character[attackID].HP;
			$(".attacker .progress-bar").width(attHpPercent + "%").text(Math.round(attHpPercent) + "%");;


			if(attackHP > 0){ //if attacker still have hp show message
				msg.html("<p>You attacked " + character[defenderId]["name"] + " for "+ attackPower + " damage. <br>" +
				character[defendID]["name"] + " attacked you back for "+ character[defendID]["counterAttack"] + " damage.</p>");
			}else{ //if attacker's hp is less than 1 then game over
				msg.html("<p>You have been defeated...</P>");
				$("#attack").css("display", "none");
				$("#restart").css("display", "block");
			}
		}		
	});
