const state = {
	view: {
		tiles: document.querySelectorAll(".tile"),
		ralph: document.querySelector(".ralph"),
		time: document.querySelector("#time"),
		score: document.querySelector("#score")
	},
	value: {
		intervalId: null,
		gamePace: 1000,
		ralphTile: 0,
		score: 0,
	}
}

function randomRalphSpawn() {
	const tiles = state.view.tiles;

	tiles.forEach(
		(tile) => {
			tile.classList.remove("ralph");
		}
	);

	const tileIdx = Math.floor(Math.random() * 9);
	tiles[tileIdx].classList.add("ralph");
	state.value.ralphTile = tiles[tileIdx].id;
}

function listenTileClicked() {
	state.view.tiles.forEach(
		(tile) => {
			tile.addEventListener("mousedown", () => {
				if (tile.id == state.value.ralphTile) {
					state.value.score++;
					state.view.score.textContent = state.value.score;
					state.value.ralphTile = 0;
				}
			});
		}	
	);
}

function main() {
	let intervalId = state.value.intervalId;

	intervalId = setInterval(randomRalphSpawn, state.value.gamePace);
	listenTileClicked();
}

main();
