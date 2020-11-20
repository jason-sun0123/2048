var board=new Array();

var hasConflicted = new Array();

var score = 0;

$(function(){
	newgame();
});

function newgame(){
	init();
	generateOneNumber();
	generateOneNumber();
}

function restartgame() {
	$("#gameover").remove();
	updateScore(0);
	newgame();
}

function init(){
	for(var i=0;i<4;i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j=0;j<4;j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top", getPosTop(i, j));
			gridCell.css("left", getPosLeft(i, j));
		}
	}
	
	updateBoardView();
	score = 0;
	$("#score").text(0);
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
			var numberCell = $("#number-cell-" + i + "-" + j);
			if(board[i][j] == 0){
				numberCell.css("width", "0px");
				numberCell.css("height", "0px");
				numberCell.css("top", getPosTop(i, j)+50);
				numberCell.css("left", getPosLeft(i, j)+50);
			}
			else{
				numberCell.css("width", "100px");
				numberCell.css("height", "100px");
				numberCell.css("top", getPosTop(i, j));
				numberCell.css("left", getPosLeft(i, j));
				numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
				numberCell.css("color", getNumberColor(board[i][j]));
				numberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
}
function generateOneNumber(){
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	while (true) {
		if (board[randx][randy] == 0) {
			break;
		}
		var randx = parseInt(Math.floor(Math.random() * 4));
		var randy = parseInt(Math.floor(Math.random() * 4));
	}
	var randNumber = Math.random() < 0.5?2:4;
	board[randx][randy] = randNumber;
	ShowNumberWithAnimation(randx, randy, randNumber);
}

function getPosTop(i,j){
	return 20+i*120;
}

function getPosLeft(i,j){
	return 20+j*120;
}

function getNumberBackgroundColor(number){
	switch(number){
		case 2: return "#eee4da"; break;
		case 4: return "#ede0c8"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f67c5f"; break;
		case 64: return "#f65e3b"; break;
		case 128: return "#edcf72"; break;
		case 256: return "#edcc61"; break;
		case 512: return "#9c0"; break;
		case 1024: return "#33b5e5"; break;
		case 2048: return "#09c"; break;
		case 4096: return "#a6c"; break;
		case 8192: return "#93c"; break;
	}
}

function getNumberColor(number){
	if (number <= 4){
		return "#776e65";
	}
	return "white";
}