angular
	.module('TicTacToe')
	.factory('BoardManager', BoardManager);

BoardManager.$inject=['$firebase'];

function BoardManager ($firebase) {

	var gameBoard = function () {
		var self = this;
		self.switchTurn 	= switchTurn;
		self.clearBoard 	= clearBoard;
		self.winCombo 		= winCombo;
		self.isActive 		= isActive;
		self.getBoard		= getBoard();

		self.mario.$loaded(function(){

			if(!self.mario.gameInfo.numPlayers) {
				self.mario.gameInfo.numPlayers 		= 0;
				self.mario.gameInfo.turnCounter 	= 1;
				self.mario.gameInfo.mushroomScore 	= 0;
				self.mario.gameInfo.coinScore 		= 0;
				
				self.mario.$save();
			}
			self.playerNum = self.mario.gameInfo.numPlayers;
			self.mario.gameInfo.numPlayers = self.mario.gameInfo.numPlayers += 1;
			
			console.log(self.mario.gameInfo.numPlayers);
			self.mario.$save();
		});

		function getBoard(){
			var ref 			= new Firebase ("https://tictacmario.firebaseio.com/");
			self.mario 			= $firebase(ref).$asObject();
			self.mario.board 	= ["", "", "", "", "", "", "", "", ""];
			self.mario.gameInfo = {whoseTurn: "Mushroom Goes First", banner: "TIC TAC MARIO", gameOver: false};

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
					if ((self.mario.gameInfo.turnCounter % 2 !== 0) && self.playerNum == 0) {
						self.mario.board[index] 			= "mushroom";
						self.mario.gameInfo.whoseTurn 		= ("It's O's Turn");
						self.mario.gameInfo.turnCounter ++;

					} else if ((self.mario.gameInfo.turnCounter % 2 == 0) && self.playerNum == 1) {
						self.mario.board[index] 			= "coin";
						self.mario.gameInfo.whoseTurn		= ("It's X's Turn");
						self.mario.gameInfo.turnCounter ++;
					}
				self.mario.gameInfo.banner = ("HERE WE GO!");
			

				//if any of the win combos = X, X wins
				if (self.winCombo("mushroom")) {
					self.mario.gameInfo.banner		= ("MUSHROOM WINS!");
					self.mario.gameInfo.gameOver	= true;
					self.mario.gameInfo.mushroomScore++;
				}

				//if any of the win combos = O, O wins
				if (self.winCombo("coin")) {
					self.mario.gameInfo.banner		= ("COIN WINS!");
					self.mario.gameInfo.gameOver 	= true;
					self.mario.gameInfo.coinScore ++;
				}
			}
			//if after 9 turns & no winner = cat's game
			if (self.mario.gameInfo.turnCounter == 10 && self.mario.gameInfo.gameOver == false) {
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
			self.mario.gameInfo.turnCounter		= 1;
			self.mario.gameInfo.gameOver		= false;
			self.mario.gameInfo.banner			= ("TIC TAC MARIO");
			self.mario.gameInfo.whoseTurn 		= ("Mushroom Goes First!");
			self.mario.$save();
		}
	};
	return gameBoard;
}
