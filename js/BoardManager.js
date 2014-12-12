angular
	.module('TicTacToe')
	.factory('BoardManager', BoardManager);

BoardManager.$inject = ['PlayerManager'];

function BoardManager (PlayerManager, numSquares) {
	var SQUARE_STATE = ['unselected-square', 'x-selected', 'o-selected'];

	var board = function  (numSquares) {
		var self = this;
		// self.numSquares 	= numSquares;
		self.squares 		= new Array( numSquares );
		self.switchTurn 	= switchTurn;
		// self.getSquareState = getSquareState;
		self.clearBoard 	= clearBoard;
		self.winCombo 		= winCombo;

		self.clearBoard();

		//switches between an index of 0, 1, 2 in the array
		
		var playerCounter = 1;
		var turnCounter = 0;
		function switchTurn (num) {
			// this.squares[num] = (this.squares[num] + 1) % SQUARE_STATE.length;
			if (self.squares[num] == 0) {	
				if (playerCounter == 1) {
					self.squares[num] = "X";
					playerCounter = 2;
				} else {
					self.squares[num] = "O";
					playerCounter = 1;
				}
				turnCounter ++;
			}
			if (self.winCombo("X")) {
				alert ("X Wins!");
				self.clearBoard();
			}
			if (self.winCombo("O")) {
				alert ("O Wins!");
				self.clearBoard();
			}
			//if after 9 turns & no winner = cat's game
			if (turnCounter == 9) {
				alert ("Cat's Game");
				self.clearBoard();
			}
		}

		//all possible win scenarios
		function winCombo (marker) {
			return (
					(self.squares[0] == marker && self.squares[1] == marker && self.squares[2] == marker) || //horizontal wins 
					(self.squares[3] == marker && self.squares[4] == marker && self.squares[5] == marker) ||
					(self.squares[6] == marker && self.squares[7] == marker && self.squares[8] == marker) ||
					(self.squares[0] == marker && self.squares[3] == marker && self.squares[6] == marker) || //vertical wins
					(self.squares[1] == marker && self.squares[4] == marker && self.squares[7] == marker) ||
					(self.squares[2] == marker && self.squares[5] == marker && self.squares[8] == marker) ||
					(self.squares[2] == marker && self.squares[4] == marker && self.squares[6] == marker) || //diagonal wins
					(self.squares[0] == marker && self.squares[4] == marker && self.squares[8] == marker) 
				)
		}

		//switches the index number of SQUARE STATE in order to flip through each class
		// function getSquareState (num) {
		// 	return SQUARE_STATE[self.squares[num]];
		// }

		//sets the value of each square to an empty string & resets the turn conter
		function clearBoard() {
			for (var i = 0; i < self.squares.length; i++) {
				self.squares[i] = "";
			}
			turnCounter = 0;
		}
	};
	return board;
}
