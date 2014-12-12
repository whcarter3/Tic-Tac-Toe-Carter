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
		this.getSquareState = getSquareState;
		this.clearBoard 	= clearBoard;

		this.clearBoard();

		//switches between an index of 0, 1, 2 in the array
		var turnCounter = 1;
		function switchTurn (num) {
			// this.squares[num] = (this.squares[num] + 1) % SQUARE_STATE.length;
			if (this.squares[num] == 0) {	
				if (turnCounter == 1) {
					this.squares[num] = "X";
					turnCounter = 2;
				} else {
					this.squares[num] = "O";
					turnCounter = 1;
				}
			}
		}

		//switches the index number of SQUARE STATE in order to flip through each class
		function getSquareState (num) {
			return SQUARE_STATE[this.squares[num]];
		}
		//sets the index number of the state of the square array to 0
		function clearBoard() {
			for (var i = 0; i < this.squares.length; i++) {
				this.squares[i] = "";
			};
		}
	};
	return board;
}
