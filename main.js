const state = {
	view: {
		tiles: document.querySelectorAll(".tile"),
		ralph: document.querySelector(".ralph"),
		time: document.querySelector("#time"),
		score: document.querySelector("#score"),
		menu: document.querySelector(".menu")
	},
	value: {
		ralphTileId: -1,
		score: 0,
		time: 30,
	},
	action: {
		ralphPaceId: setInterval(randomRalphSpawn, 1000),
		countdownId: setInterval(countdown, 1000)
	}
}

function randomRalphSpawn() {
	const tiles = state.view.tiles;

	// clear tiles state
	tiles.forEach(
		(tile) => {
			tile.classList.remove("ralph");
		}
	);

	// draw a new ralph's tile
	const tileIdx = Math.floor(Math.random() * 9);

	tiles[tileIdx].classList.add("ralph");
	state.value.ralphTileId = tiles[tileIdx].id;
}

function listenTileClicked() {
	state.view.tiles.forEach(
		(tile) => {
			tile.addEventListener("mousedown", () => {
				if (tile.id == state.value.ralphTileId &&
					state.value.time > 0) {
					playSound("hit");
					state.value.score++;
					state.view.score.textContent = state.value.score;
					state.value.ralphTileId = -1;
				}
			});
		}
	);
}

function countdown() {
	state.view.time.textContent = state.value.time;

	if (state.value.time <= 0) {
		clearInterval(state.action.ralphPaceId);
		clearInterval(state.action.countdownId);

		state.view.menu.innerHTML = `
			<h2>You scored ${state.value.score} points!<h2>
			<h2>Press F5 to try again.<h2>`
	}
	state.value.time--;
}

function playSound(soundName) {
	let audio = new Audio(`audios/${soundName}.m4a`);

	audio.volume = 0.1;
	audio.play();
}

function main() {
	listenTileClicked();
}

main();
