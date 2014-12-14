angular
	.module('TicTacToe')
	.factory('BoardManager', BoardManager);

BoardManager.$inject=['$firebase'];

function BoardManager ($firebase) {
	var SQUARE_STATE = ['unselected-square', 'x-selected', 'o-selected'];

	var gameBoard = function () {
		var self = this;
		self.switchTurn 	= switchTurn;
		self.clearBoard 	= clearBoard;
		self.winCombo 		= winCombo;
		self.isActive 		= isActive;
		self.getBoard		= getBoard();

		function getBoard(){
			var ref 			= new Firebase ("https://tictacmario.firebaseio.com/");
			self.mario 			= $firebase(ref).$asObject();
			self.mario.board 	= ["", "", "", "", "", "", "", "", ""];
			self.mario.gameInfo = {turnCounter: 0, playerCounter: 1, xScore: 0, oScore: 0, whoseTurn: "X Goes First", banner: "TIC TAC MARIO", gameOver: false}
			self.mario.$save();

			return self.mario;
		}

		//if game over === true, it won't run switchTurn
		function isActive (index) {
			if (self.mario.gameInfo.gameOver === false) {
				switchTurn(index);
			};
		}
		
		function switchTurn (index) {
			//if the content of the squares div (referred to by index) is equal to "" allow players to click squares
			if (self.mario.board[index] == "") {	
				if (self.mario.gameInfo.playerCounter == 1) {
					self.mario.board[index] 			= "X";
					self.mario.gameInfo.playerCounter 	= 2;
					self.mario.gameInfo.whoseTurn 		= ("It's O's Turn");

				} else {
					self.mario.board[index] 			= "O";
					self.mario.gameInfo.playerCounter 	= 1;
					self.mario.gameInfo.whoseTurn		= ("It's X's Turn")
				}
				self.mario.gameInfo.turnCounter ++;
				self.mario.gameInfo.banner = ("HERE WE GO!");
			}

			//if any of the win combos = X, X wins
			if (self.winCombo("X")) {
				self.mario.gameInfo.banner		= ("X WINS!");
				self.mario.gameInfo.gameOver	= true;
				self.mario.gameInfo.xScore++;
			}

			//if any of the win combos = O, O wins
			if (self.winCombo("O")) {
				self.mario.gameInfo.banner		= ("0 WINS!");
				self.mario.gameInfo.gameOver 	= true;
				self.mario.gameInfo.oScore ++;
			}
			//if after 9 turns & no winner = cat's game
			if (self.mario.gameInfo.turnCounter == 9) {
				self.mario.gameInfo.banner		= ("CAT'S GAME!");
				self.mario.gameInfo.gameOver 	= true;
			}
			if (self.mario.gameInfo.gameOver == true) {
				self.mario.gameInfo.whoseTurn	= ("GAME OVER!");
			}
			self.mario.$save();
		}

		//all possible win scenarios
		function winCombo (marker) {
			return (
					(self.mario.board[0] == marker && self.mario.board[1] == marker && self.mario.board[2] == marker) || //horizontal wins 
					(self.mario.board[3] == marker && self.mario.board[4] == marker && self.mario.board[5] == marker) ||
					(self.mario.board[6] == marker && self.mario.board[7] == marker && self.mario.board[8] == marker) ||
					(self.mario.board[0] == marker && self.mario.board[3] == marker && self.mario.board[6] == marker) || //vertical wins
					(self.mario.board[1] == marker && self.mario.board[4] == marker && self.mario.board[7] == marker) ||
					(self.mario.board[2] == marker && self.mario.board[5] == marker && self.mario.board[8] == marker) ||
					(self.mario.board[2] == marker && self.mario.board[4] == marker && self.mario.board[6] == marker) || //diagonal wins
					(self.mario.board[0] == marker && self.mario.board[4] == marker && self.mario.board[8] == marker) 
			)
		}
		//sets the value of each square to an empty string & resets the turn conter
		function clearBoard() {
			self.mario.board 					= ["", "", "", "", "", "", "", "", ""];
			self.mario.gameInfo.turnCounter		= 0;
			self.mario.gameInfo.playerCounter	= 1;
			self.mario.gameInfo.gameOver		= false;
			self.mario.gameInfo.banner			= ("TIC TAC MARIO");
			self.mario.gameInfo.whoseTurn 		= ("X Goes First!");
			self.mario.$save();
		}
	};
	return gameBoard;
}
