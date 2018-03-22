// game settings
var width = 50;
var height = 30;
var snake_x = 1;
var snake_y = 1;
var interval = 100;
var int_id;

// game varibales
var snakeLength = 0;
var tailX = [snake_x]; 
var tailY = [snake_y]; 
var fruitX;
var fruitY;
var running = false; 
var gameOver = false; 
var direction = -1; // up = 1, down = -1, left = 2, right = -2 
var tempdir = direction; 

var score = 0;

// start of the game
function run(){
	init();
	int_id = setInterval(gameLoop,interval);
}

function init(){
	createGrid();
	createSnake();
	createFruit();
}

function createGrid(){
	document.write("<div class='container'>");
	document.write("<div class='row'>");
	document.write("<table>");

	for(var y = 0;y<height;y++){
		document.write("<tr>");
		for(var x = 0;x<width;x++){
			if(y == 0|| y== height-1 ||x == 0|| x == width-1){
				document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
			}
			else{ 
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>"); 
            }
		}
		document.write("</tr>");

	}
	document.write("</table>");
	document.write("<h3 id='score'>Score</h3>");
	document.write("</div>");
	document.write("</div>");

}

function createSnake(){
	set(snake_x,snake_y,"snake");

	// document.getElementById("test").innerHTML = "New text!";
}

function get(x,y){
	return document.getElementById(x+"-"+y);
}

function set(x,y,attribute){
	if(x!=null && y!=null){
		get(x,y).setAttribute("class",attribute);
	}
}

function getType(x,y){ 
    return get(x,y).getAttribute("class"); 
} 

function rand(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function createFruit(){
	var foundBlank = false;
	while(!foundBlank && (snakeLength <= (width-2)*(height-2))){
		var randX = rand(0,width-1);
		var randY = rand(0,height-1);
		if(getType(randX,randY) == "blank"){
			foundBlank = true;
		}
	}
	set(randX,randY,"fruit");
	fruitX = randX;
	fruitY = randY;
}

window.addEventListener("keypress", function key(event){ 
	var key = event.keyCode; 
	// up = 1, down = -1, left = 2, right = -2 
    if(direction != -1 && (key == 119 || key == 87)){
    	tempdir = 1;
    	// document.getElementById("test").innerHTML = "Up";
    }
    else if(direction != 1 && (key == 115 || key == 83)){
    	tempdir = -1;
    	// document.getElementById("test").innerHTML = "Down";
    }
    else if(direction != -2 && (key == 97 || key == 65)){
    	tempdir = 2;
    	// document.getElementById("test").innerHTML = "Left";
    }
    else if(direction != 2 && (key == 100 || key == 68)){
    	tempdir = -2;
    	// document.getElementById("test").innerHTML = "Right";
    }
    if(!running){
    	running = true;
    	// document.getElementById("test").innerHTML = "Run";
    }
}); 

function gameLoop(){ 
    if(running && !gameOver){ 
        update(); 
    }else if(gameOver){ 

        clearInterval(int_id); 
        alert("Game Over!! Try Again!!");
        location.reload();
    } 
}

function update(){
	direction = tempdir;

	set(fruitX,fruitY,"fruit");
	updateTail();
	set(tailX[length], tailY[length], "blank"); 
	if(direction == 1){
		snake_y --;
	}
	else if(direction == -1){
		snake_y ++;
	}
	else if(direction == 2){
		snake_x --;
	}
	else if(direction == -2){
		snake_x ++;
	}
	set(snake_x,snake_y,"snake");

	for(var i = tailX.length-1; i >=0; i--){ 
        if(snake_x == tailX[i] && snake_y == tailY[i]){ 
            gameOver = true; 
            break; 
        } 
    } 

	if(snake_y == 0|| snake_y== height-1 || snake_x == 0|| snake_x == width-1){
		gameOver = true;
	}
	else if(snake_x == fruitX && snake_y == fruitY){
		createFruit();
		length ++;
		score ++;
	}
	document.getElementById("score").innerHTML = "Score = " + score;
}

function updateTail(){ 
    for(var i = length; i > 0; i--){ 
        tailX[i] = tailX[i-1]; 
        tailY[i] = tailY[i-1]; 
    } 
    tailX[0] = snake_x; 
    tailY[0] = snake_y; 
}

function reset(){
	snake_x = 1;
	snake_y = 1;

	// game varibales
	snakeLength = 0;
	tailX = [snake_x]; 
	tailY = [snake_y]; 
	running = false; 
	gameOver = false; 
	direction = -1; // up = 1, down = -1, left = 2, right = -2 
	tempdir = direction; 
	score = 0;
	init();
} 

run();