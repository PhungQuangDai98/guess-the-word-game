const inputs = document.querySelector(".input");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typing = document.querySelector(".typing");

class GuessTheWordGame {
	word;
	maxGuess;
	correct = [];
	incorrect = [];
	wordList;
	constructor(wordList) {
		this.wordList = wordList;
		this.init();
		resetBtn.addEventListener("click", () => this.init());
		typing.addEventListener("input", (e) => this.playGame(e));
		inputs.addEventListener("click", () => typing.focus());
		document.addEventListener("keydown", () => typing.focus());
	}
	init() {
		let randomObj = this.wordList[~~(Math.random() * this.wordList.length)];
		this.word = randomObj.word;
		this.maxGuess = this.word.length * 2;
		this.correct = [];
		this.incorrect = [];

		hint.innerHTML = randomObj.hint;
		guessLeft.innerText = this.maxGuess;
		wrongLetter.innerText = this.incorrect;

		let html = "";
		for (let i = 0; i < this.word.length; i++) {
			html += `<input type="text" disabled />`;
		}
		inputs.innerHTML = html;
	}

	playGame(e) {
		const key = e.target.value;
		if (
			key.match(/^[a-zA-Z]+$/) &&
			!this.incorrect.includes(key) &&
			!this.correct.includes(key)
		) {
			if (this.word.includes(key)) {
				for (let i = 0; i < this.word.length; i++) {
					if (this.word[i] === key) {
						this.correct.push(key);
						inputs.querySelectorAll("input")[i].value = key;
					}
				}
			} else {
				this.maxGuess--;
				this.incorrect.push(key);
			}
			guessLeft.innerText = this.maxGuess;
			wrongLetter.innerText = this.incorrect;
		}
		typing.value = "";
		this.endGame();
	}
	endGame() {
		if (this.correct.length === this.word.length) {
			alert(`Congrats! You found the word ${this.word.toUpperCase()}`);
			this.init();
		} else if (this.maxGuess < 1) {
			alert("Game over! You don't have remaining guess");
			for (let i = 0; i < this.word.length; i++) {
				inputs.querySelectorAll("input")[i].value = this.word[i];
			}
		}
	}
}

((wordList) => {
	new GuessTheWordGame(wordList);
})(wordList);
