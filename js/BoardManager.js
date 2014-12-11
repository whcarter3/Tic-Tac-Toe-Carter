angular
	.module('TicTacToe')
	.factory('BoardManager', BoardManager);

BoardManager.$inject = ['PlayerManager'];

function BoardManager (PlayerManager, numSquares) {
	var SQUARE_STATE = ['unselected-square', 'x-selected', 'o-selected'];

	var board = function  (numSquares) {
		
		this.numSquares 	= numSquares;
		this.squares 		= new Array( numSquares );
		this.toggleState 	= toggleState;
		this.getSquareState = getSquareState;
		this.clearBoard 	= clearBoard;

		this.clearBoard();

		//switches between 0, 1, 2 in the array
		function toggleState (num) {
			this.squares[num] = (this.squares[num] + 1) % SQUARE_STATE.length;
		}

		//gets the array SQUARE_STATE and sets it to 0
		function getSquareState (num) {
			return SQUARE_STATE[this.squares[num]];
		}
		//sets each of the state arrays to 0
		function clearBoard() {
			for (var i = 0; i < this.squares.length; i++) {
				this.squares[i] = 0;
			};
		}
	};
	return board;
}
