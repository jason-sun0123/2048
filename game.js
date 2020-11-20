$(document).keydown(function(event){
	switch (event.keyCode){
		case 37: case 65://left
			if (moveLeft()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 38: case 87://up
			if (moveUp()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 39: case 68://right
			if (moveRight()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 40: case 83://down
			if (moveDown()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		default:
			break;
	}
});

function moveLeft(){
	if (!canMoveLeft(board)) {
		return false;
	}
	for (var i=0;i<4;i++) {
		for (var j=1;j<4;j++) {
			if (board[i][j] != 0) {
				for (var k=0;k<j;k++) {
					if (board[i][k] == 0 && noBlockHorizontalCol(i, k, j, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[i][k] == board[i][j] && noBlockHorizontalCol(i, k, j, board) && !hasConflicted[i][k]) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						
						score += board[i][k];
						updateScore(score);
						
						hasConflicted[i][k] = true;
						
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();", 200);
	return true;
}

function moveUp(){
	if (!canMoveUp(board)) {
		return false;
	}
	for (var i=1;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (board[i][j] != 0) {
				for (var k=0;k<i;k++) {
					if (board[k][j] == 0 && noBlockVerticalRow(j, k, i, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[k][j] == board[i][j] && noBlockVerticalRow(j, k, i, board) && !hasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						
						score += board[k][j];
						updateScore(score);
						
						hasConflicted[k][j] = true;
						
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();", 200);
	return true;
}

function moveRight(){
	if (!canMoveRight(board)) {
		return false;
	}
	for (var i=0;i<4;i++) {
		for (var j=2;j>=0;j--) {
			if (board[i][j] != 0) {
				for (var k=3;k>j;k--) {
					if (board[i][k] == 0 && noBlockHorizontalCol(i, j, k, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[i][k] == board[i][j] && noBlockHorizontalCol(i, j, k, board) && !hasConflicted[i][k]) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						
						score += board[i][k];
						updateScore(score);
						
						hasConflicted[i][k] = true;
						
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();", 200);
	return true;
}

function moveDown(){
	if (!canMoveDown(board)) {
		return false;
	}
	for (var i=2;i>=0;i--) {
		for (var j=0;j<4;j++) {
			if (board[i][j] != 0) {
				for (var k=3;k>i;k--) {
					if (board[k][j] == 0 && noBlockVerticalRow(j, i, k, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[k][j] == board[i][j] && noBlockVerticalRow(j, i, k, board) && !hasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						
						score += board[k][j];
						updateScore(score);
						
						hasConflicted[k][j] = true;
						
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();", 200);
	return true;
}

function isgameover() {
	if (nospace(board) && nomove(board)) {
		gameover();
	}
}

function gameover() {
	$("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>"+score+"</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
	var gameover = $("#gameover");
	gameover.css("width", "460px");
	gameover.css("height", "460px");
	gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}

function canMoveLeft(board) {
	for (var i=0;i<4;i++) {
		for (var j=1;j<4;j++) {
			if (board[i][j] != 0) {
				if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(board) {
	for (var i=1;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (board[i][j] != 0) {
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(board) {
	for (var i=0;i<4;i++) {
		for (var j=2;j>=0;j--) {
			if (board[i][j] != 0) {
				if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(board) {
	for (var i=2;i>=0;i--) {
		for (var j=0;j<4;j++) {
			if (board[i][j] != 0) {
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontalCol(row, col1, col2, board) {
	for (var i=col1+1;i<col2;i++) {
		if (board[row][i] != 0) {
			return false;
		}
	}
	return true;
}

function noBlockVerticalRow(col, row1, row2, board) {
	for (var i=row1+1;i<row2;i++) {
		if (board[i][col] != 0) {
			return false;
		}
	}
	return true;
}

function nospace(board) {
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (board[i][j] == 0) {
				return false;
			}
		}
	}
	return true;
}

function nomove(board) {
	if (canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board)) {
		return false;
	}
	return true;
}