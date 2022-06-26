const inputs = document.querySelector(".input");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typing = document.querySelector(".typing");

let word;
let maxGuess;
let correct = [];
let incorrect = [];

function init() {
	let randomObj = wordList[~~(Math.random() * wordList.length)];
	word = randomObj.word;
	maxGuess = word.length * 2;
	correct = [];
	incorrect = [];

	hint.innerHTML = randomObj.hint;
	guessLeft.innerText = maxGuess;
	wrongLetter.innerText = incorrect;

	let html = "";
	for (let i = 0; i < word.length; i++) {
		html += `<input type="text" disabled />`;
	}
	inputs.innerHTML = html;
}

function playGame(e) {
	const key = e.target.value;
	if (
		key.match(/^[a-zA-Z]+$/) &&
		!incorrect.includes(key) &&
		!correct.includes(key)
	) {
		if (word.includes(key)) {
			for (let i = 0; i < word.length; i++) {
				if (word[i] === key) {
					correct.push(key);
					inputs.querySelectorAll("input")[i].value = key;
				}
			}
		} else {
			maxGuess--;
			incorrect.push(key);
		}
		guessLeft.innerText = maxGuess;
		wrongLetter.innerText = incorrect;
	}
	typing.value = "";
	endGame();
}

function endGame() {
	if (correct.length === word.length) {
		alert(`Congrats! You found the word ${word.toUpperCase()}`);
		init();
	} else if (maxGuess < 1) {
		alert("Game over! You don't have remaining guess");
		for (let i = 0; i < word.length; i++) {
			inputs.querySelectorAll("input")[i].value = word[i];
		}
	}
}

init();
resetBtn.addEventListener("click", init);
typing.addEventListener("input", playGame);
inputs.addEventListener("click", () => typing.focus());
document.addEventListener("keydown", () => typing.focus());
