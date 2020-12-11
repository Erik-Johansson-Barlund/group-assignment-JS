class Game {
	constructor() {
		this.counter = 21;
		this.turn = true; // player1 = true
		this.highscore = [];
		this.player1 = '';
		this.player2 = '';
		this.stickArray = [];
	}
	removeSticks() {
		let noOfSticks = 0;
		if (event.target.id == 'btn1') {
			noOfSticks = 1;
			this.stickArray.pop();
		}
		if (event.target.id == 'btn2') {
			noOfSticks = 2;
			this.stickArray.splice(this.stickArray.length - 2, 2);
		}
		if (event.target.id == 'btn3') {
			noOfSticks = 3;
			this.stickArray.splice(this.stickArray.length - 3, 3);
		}
		let lastCount = this.counter;
		this.counter -= noOfSticks;
		board.innerHTML =
			'<div class="stickText">' + this.counter + ' Stickor kvar</div>';
		board.innerHTML += this.stickArray.join('');
		if (noOfSticks >= lastCount) {
			this.turn = this.turn ? false : true;
			this.endGame();
		}
		if (this.counter > 1) {
			this.turn = this.turn ? false : true;
			if (this.turn) {
				infoText.innerHTML = `${this.player2} tog ${noOfSticks} pinnar. Hur många vill du ta?`;
				playerText.innerHTML = `${this.player1}s tur`;
			} else {
				infoText.innerHTML = `${this.player1} tog ${noOfSticks} pinnar. Hur många vill du ta?`;
				playerText.innerHTML = `${this.player2}s tur`;
			}
		} else {
			this.endGame();
		}
	}

	setupPlayers(){
		if (this.player1 == '') {
			while (this.player1 === '') {
				this.player1 = prompt('Namn för spelare 1');
			}
			while (this.player2 === '') {
				this.player2 = prompt('Namn för spelare 2');
			}
			if (this.player1 === null || this.player2 === null){
				this.player1 = '';
				this.player2 = '';
				alert("Bägge spelarna måste ha ett namn.")
			} else 
				this.startGame();
		}
	}

	startGame() {
		this.counter = 21;
		this.turn = true;
		this.turn = Math.round(Math.random());
		infoText.innerHTML = 'Hur många pinnar vill du ta?';
		btnStart.style.display = 'none';
		btn1.style.display = 'block';
		btn2.style.display = 'block';
		btn3.style.display = 'block';
		this.setupSticks();

		if (this.turn) playerText.innerHTML = `${this.player1}s tur`;
		else playerText.innerHTML = `${this.player2}s tur`;
		board.innerHTML =
			'<div class="stickText">' + this.counter + ' Stickor kvar</div>';
		board.innerHTML += this.stickArray.join('');
	}

	endGame() {
		let winner = this.turn ? this.player1 : this.player2;
		board.innerHTML = '<h4>' + winner + ' vann!</h4>';
		playerText.innerHTML = "Start";
		infoText.innerHTML = "Tryck start för nytt spel";
		let notInHiScore = true;
		for (let player of this.highscore) {
			if (player.name == winner) {
				player.points += 2;
				notInHiScore = false;
				break;
			}
		}
		if (notInHiScore) {
			this.highscore.push(new hiScoreEntry(winner));
		}
		this.printHighScore();
		btn1.style.display = 'none';
		btn2.style.display = 'none';
		btn3.style.display = 'none';
		btnStart.style.display = 'block';
		
		let playAgain = confirm(`${winner} vann. Vill du spela igen?`);
		if (playAgain) this.startGame();
		else {
			this.player1 = '';
			this.player2 = '';
		}
	}

	printHighScore() {
		let output = '';
		let sorted = this.highscore.sort((a, b) => b.points - a.points);
		let listSize = sorted.length >= 10 ? 10 : sorted.length;
		for (let player = 0; player < listSize; player++) {
			output +=
				sorted[player].name + ': ' + sorted[player].points + '<br>';	
		}  
		highScoreText.innerHTML = output;
	}

	setupSticks() {
		this.stickArray = [];
		for (let i = 0; i < this.counter; i++) {
			let stick = `<div class="allsticks" style=" left: ${
				47 + Math.round(Math.random() * 6)
			}%; transform: rotate(${Math.random() * 180}deg);"></div>`;
			this.stickArray.push(stick);
		}
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
let infoText;
let btn1;
let btn2;
let btn3;
let myGame;

document.addEventListener('DOMContentLoaded', function (e) {
	board = document.getElementById('board');
	highScoreText = document.getElementById('hiscore');
	playerText = document.getElementById('playertext');
	infoText = document.getElementById('infotext');
	btnStart = document.getElementById('btnStart');
	btn1 = document.getElementById('btn1');
	btn2 = document.getElementById('btn2');
	btn3 = document.getElementById('btn3');
	btn1.style.display = 'none';
	btn2.style.display = 'none';
	btn3.style.display = 'none';
	myGame = new Game();

	btnStart.addEventListener('click', () => {
		myGame.setupPlayers();
	});
	btn1.addEventListener('click', () => {
		myGame.removeSticks();
	});
	btn2.addEventListener('click', () => {
		myGame.removeSticks();
	});
	btn3.addEventListener('click', () => {
		myGame.removeSticks();
	});
});
