angular
	.module('TicTacToe')
	.controller('TicTacToeController', TicTacToeController);

TicTacToeController.$inject = ['BoardManager'];

function TicTacToeController (BoardManager) {
	var NUM_SQUARES = 9;

	this.board = new BoardManager( NUM_SQUARES );
	

		




};