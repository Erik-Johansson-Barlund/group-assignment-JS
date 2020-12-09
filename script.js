class Game {
	constructor() {
		this.counter = 21;
		this.turn = true; // player1 = true
		this.highscore = [];
		this.player1 = '';
		this.player2 = '';

		//this.startGame();
	}
	removeSticks() {
		let noOfSticks = 0;
		console.log('event target id removeStics: ' + event.target.id);
		if (event.target.id == "btn1") { noOfSticks = 1; }
		if (event.target.id == "btn2") { noOfSticks = 2; }
		if (event.target.id == "btn3") { noOfSticks = 3; }
		//console.log('No of sticks to remove: ' + noOfSticks);
		this.counter -= noOfSticks;
		console.log('this counter from removeSticks: ' + this.counter);
		this.printSticks(this.counter);
		if (this.counter > 1) {
			this.turn = this.turn ? false : true;
			if (this.turn) {
				playerText.innerHTML = `${this.player1}s tur`;
			} else {
				playerText.innerHTML = `${this.player2}s tur`;
			}
		} else {
			this.endGame();
		}
	}

	startGame() {
		this.counter = 21;
		this.turn = true;
		this.turn = Math.round(Math.random());
		console.log('turn ' + this.turn);
		btnStart.disabled = true; 
		if (this.player1 == "") {
			while (this.player1 === "") {
				this.player1 = prompt('Namn för spelare 1');
			}
			console.log(this.player1);
			while (this.player2 === "") {
				this.player2 = prompt('Namn för spelare 2');
			}
			if (this.player1 === null || this.player2 === null )
				location.reload();
			console.log(this.player2);
		}
		
		if (this.turn)
			playerText.innerHTML = `${this.player1}s tur`;
		else
			playerText.innerHTML = `${this.player2}s tur`;
		this.printSticks(this.counter);
	}

	endGame() {
		let winner = this.turn ? this.player1 : this.player2
		board.innerHTML = winner + " vann!";
		let notInHiScore = true;
		for (let player of this.highscore) {
			if (player.name == winner) {
				player.points += 2;
				notInHiScore = false;
				console.log("Found player in highscore" + player.points);
				break;
			}
		}
		if (notInHiScore) {
			this.highscore.push(new hiScoreEntry(winner));
		}

		this.printHighScore();
		
		btnStart.disabled = false; 

		let playAgain = confirm("Vill du spela igen?");
		if (playAgain) 
			this.startGame();
		else {
			this.player1 = "";
			this.player2 = ""; 
		}
	}

	printHighScore() {
		let output = "";
		this.highscore.sort((a, b) => a.points - b.points);
		for (let player of this.highscore) {
			output += player.name + ": " + player.points + "<br>";
		}
		highScoreText.innerHTML = output;
	}

	printSticks(noOfSticks) {
		let outputSticks = ``;
		let stick = `<div class="game__stick"></div>`;
		for(let i = 1; i<= this.counter; i++){
			outputSticks += stick;
		}
		board.innerHTML = outputSticks;
	}
}

class hiScoreEntry {
	constructor(name, points = 2) {
		this.name = name;
		this.points = points;
	}
}

let board;
let playerText;
let btnStart;
let btn1;
let btn2;
let btn3;
let myGame;

document.addEventListener('DOMContentLoaded', function (e) {
	board = document.getElementById('board');
	highScoreText = document.getElementById('hiscore');
	playerText = document.getElementById('playertext');
	btnStart = document.getElementById("btnStart");
	btn1 = document.getElementById("btn1");
	btn2 = document.getElementById("btn2");
	btn3 = document.getElementById("btn3");
	myGame = new Game();
	//myGame.startGame(); körs i constructorn 

	btnStart.addEventListener("click", () => {
		console.log("Knapp start");
		myGame.startGame();
	});
	btn1.addEventListener("click", () => {
		console.log("Knapp 1 trycks");
		myGame.removeSticks();
	});
	btn2.addEventListener("click", () => {
		console.log("Knapp 2 trycks");
		myGame.removeSticks();
	});
	btn3.addEventListener("click", () => {
		console.log("Knapp 3 trycks");
		myGame.removeSticks();
	});

});

