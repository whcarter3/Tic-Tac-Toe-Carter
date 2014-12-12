angular
	.module('TicTacToe')
	.factory('BoardManager', BoardManager);

BoardManager.$inject = ['PlayerManager'];

function BoardManager (PlayerManager, numSquares) {
	var SQUARE_STATE = ['unselected-square', 'x-selected', 'o-selected'];

	var board = function  (numSquares) {
		
		// this.numSquares 	= numSquares;
		this.squares 		= new Array( numSquares );
		this.switchTurn 	= switchTurn;
		// this.getSquareState = getSquareState;
		this.clearBoard 	= clearBoard;
		this.winCombo 		= winCombo;

		this.clearBoard();

		//switches between an index of 0, 1, 2 in the array
		var playerCounter = 1;
		var turnCounter = 0;
		function switchTurn (num) {
			// this.squares[num] = (this.squares[num] + 1) % SQUARE_STATE.length;
			if (this.squares[num] == 0) {	
				if (playerCounter == 1) {
					this.squares[num] = "X";
					playerCounter = 2;
				} else {
					this.squares[num] = "O";
					playerCounter = 1;
				}
				turnCounter ++;
				console.log(turnCounter)
			}
			if (this.winCombo("X")) {
				alert ("X Wins!");
				this.clearBoard();
			}
			if (this.winCombo("O")) {
				alert ("O Wins!");
				this.clearBoard();
			}
			if (turnCounter == 9) {
				alert ("Cat's Game");
				this.clearBoard();
			}
		}

		//all possible win scenarios
		function winCombo (marker) {
			return (
					(this.squares[0] == marker && this.squares[1] == marker && this.squares[2] == marker) || //horizontal wins 
					(this.squares[3] == marker && this.squares[4] == marker && this.squares[5] == marker) ||
					(this.squares[6] == marker && this.squares[7] == marker && this.squares[8] == marker) ||
					(this.squares[0] == marker && this.squares[3] == marker && this.squares[6] == marker) || //vertical wins
					(this.squares[1] == marker && this.squares[4] == marker && this.squares[7] == marker) ||
					(this.squares[2] == marker && this.squares[5] == marker && this.squares[8] == marker) ||
					(this.squares[2] == marker && this.squares[4] == marker && this.squares[6] == marker) || //diagonal wins
					(this.squares[0] == marker && this.squares[4] == marker && this.squares[8] == marker) 
				)
		}

		//switches the index number of SQUARE STATE in order to flip through each class
		// function getSquareState (num) {
		// 	return SQUARE_STATE[this.squares[num]];
		// }
		//sets the index number of the state of the square array to 0
		function clearBoard() {
			for (var i = 0; i < this.squares.length; i++) {
				this.squares[i] = "";
			}
			turnCounter = 0;
		}
	};
	return board;
}
