angular
	.module('TicTacToe')
	.factory('BoardManager', BoardManager);

BoardManager.$inject=['$firebase']

function BoardManager ($firebase) {
	var SQUARE_STATE = ['unselected-square', 'x-selected', 'o-selected'];



	var gameBoard = function  (numSquares) {
		var self = this;
		self.squares 		= new Array( numSquares );
		self.switchTurn 	= switchTurn;
		self.clearBoard 	= clearBoard;
		self.winCombo 		= winCombo;
		self.gameOver		= gameOver;
		self.xCounter 		= xCounter;
		self.oCounter		= oCounter;
		self.getBoard		= getBoard();
		self.isActive 		= isActive;
		self.clearBoard();
		
		var turnCounter 	= 0;
		var playerCounter 	= 1;
		var xCounter		= 0;
		var oCounter		= 0;
		var gameOver 		= false;

		function getBoard () {
			var ref 	= new Firebase ("https://tictacmario.firebaseio.com/")
			var game 	= $firebase(ref).$asObject();

			return game;
		}

		//if game over === true, it won't run switchTurn
		function isActive (index) {
			if (gameOver === false) {
				switchTurn(index);
			};
		}
		
		function switchTurn (index) {
			//if the content of the squares div (referred to by index) is equal to "" allow players to click squares
			if (self.squares[index] == "") {	
				if (playerCounter == 1) {
					self.squares[index] = "X";
					playerCounter 		= 2;
					whoseTurn.innerHTML = ("It's O's Turn");
				} else {
					self.squares[index] = "O";
					playerCounter 		= 1;
					whoseTurn.innerHTML	= ("It's X's Turn")
				}
				turnCounter ++;
				console.log("Turn counter =" + turnCounter);
			}

			if (self.winCombo("X")) {
				banner.innerHTML	= ("X WINS!");
				gameOver 			= true;
				xCounter++;
				left.innerHTML 		= ("X Score: " + xCounter.toString());
			}
			//if any of the win combos = X, player X wins
			if (self.winCombo("O")) {
				banner.innerHTML	= ("0 WINS!");
				gameOver 			= true;
				oCounter ++;
				right.innerHTML		= ("O Score: " + oCounter.toString());
			}
			//if after 9 turns & no winner = cat's game
			if (turnCounter == 9) {
				banner.innerHTML	= ("CAT'S GAME!");
				gameOver 			= true;
			}
			if (gameOver == true) {
				whoseTurn.innerHTML	= ("GAME OVER!");
				turnCounter			= 0;
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
		//sets the value of each square to an empty string & resets the turn conter
		function clearBoard() {
			for (var i = 0; i < self.squares.length; i++) {
				self.squares[i] = "";
			}
			turnCounter 		= 0;
			playerCounter 		= 1;
			gameOver			= false;
			banner.innerHTML	= ("TIC TAC MARIO");
			whoseTurn.innerHTML = ("It's X's Turn")
		}
	};
	return gameBoard;
}
