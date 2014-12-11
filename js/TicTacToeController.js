angular
	.module('TicTacToe')
	.controller('TicTacToeController', TicTacToeController);

TicTacToeController.$inject = ['BoardManager', 'PlayerManager'];

function TicTacToeController (BoardManager, PlayerManager) {
	var NUM_SQUARES = 9;

	this.board = new BoardManager( NUM_SQUARES );
	this.player = new PlayerManager ( NUM_SQUARES );

		




};