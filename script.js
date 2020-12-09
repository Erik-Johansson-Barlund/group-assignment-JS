class Game {
	constructor() {
		this.counter = 21;
		this.turn = true; // player1 = true
		this.highscore = [];
		this.player1 = '';
		this.player2 = '';
	}
	endGame() {
		/*
          lägg till vinnaren i highscore

          rensa data

          prompt spela igen? <- anropa startGame
          */
		console.log('endgame');
	}
	removeSticks() {
		/*

          ta bort pinnar grafiskt och sänka counter

          kolla om counter är 0 <- anropa endGame
          */
		//let count = 21;
		console.log(this.counter);
		if (this.counter > 0) {
			if (this.turn) {
				console.log('mm');
				playerText.innerHTML = `${this.player1}s tur`;
			} else {
				playerText.innerHTML = `${this.player2}s tur`;
			}
			this.turn = this.turn ? false : true;
		} else {
			//endGame();
		}

		/*

          ändra turn till nästa spelare 
          */
	}

	startGame() {
		//this.counter = 21;
		this.turn = true;

		this.player1 = prompt('Namn: Spelare 1');
		console.log(this.player1);
		this.player2 = prompt('Namn spelare 2');
		console.log(this.player2);
	}
}
/*
class Player {
	constructor(name, button1, button2, button3) {
		this.name = name;
	}
	puttonPressed(button) {
		// kontrollera knappens id

		game.removeSticks(button);
	}
}
*/
let board;
let playerText;
let btn1;
let btn2;
let btn3;
let myGame;

document.addEventListener('DOMContentLoaded', function (e) {
	board = document.getElementById('board');
	//console.dir(board);
	playerText = document.getElementById('playertext');
	//console.dir(playerText);
	btn1 = document.getElementById('btn1');
	btn2 = document.getElementById('btn2');
	btn3 = document.getElementById('btn3');

	myGame = new Game();
	myGame.startGame();

	btn1.addEventListener('click', myGame.removeSticks);
	btn2.addEventListener('click', myGame.removeSticks);
	btn3.addEventListener('click', myGame.removeSticks);

	console.log('här');
});
