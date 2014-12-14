angular
	.module('TicTacToe')
	.controller('TicTacToeController', TicTacToeController);

TicTacToeController.$inject = ['BoardManager'];

function TicTacToeController (BoardManager) {
	this.manager = new BoardManager();
};