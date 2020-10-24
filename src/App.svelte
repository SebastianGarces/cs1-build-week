<script>
	import { createGrid, createRandomGrid, sleep } from "./lib/utils";
	import { nextState } from "./lib/game";
	import { SIZES, INTERVALS } from "./lib/config";

	import Controls from "./components/Controls.svelte";
	import Grid from "./components/Grid.svelte";
	import Modal from "./components/Modal.svelte";
	import Rules from "./components/Rules.svelte";
	import About from "./components/About.svelte";

	export let gridSize = 0;
	export let intervalPointer = 0;

	let isPlaying = false;
	let rafId;
	let generation = 0;

	let rulesModal = false;
	let aboutModal = false;

	$: interval = INTERVALS[intervalPointer].interval;
	$: gridLength = SIZES[gridSize].grid;
	$: grid = createRandomGrid(gridLength);

	const actions = {
		reset() {
			generation = 0;
			grid = createGrid(gridLength);
		},
		random() {
			generation = 0;
			grid = createRandomGrid(gridLength);
		},
		async next() {
			generation += 1;
			grid = nextState(grid);
		},
		async play() {
			await sleep(interval);
			actions.next();

			if (isPlaying) {
				rafId = requestAnimationFrame(actions.play);
			}
		},
		incrementGridSize() {
			if (gridSize < SIZES.length - 1) {
				gridSize++;
				generation = 0;
			}
		},
		decrementGridSize() {
			if (gridSize > 0) {
				gridSize--;
				generation = 0;
			}
		},
		incrementInterval() {
			if (intervalPointer < INTERVALS.length - 1) {
				intervalPointer++;
			}
		},
		decrementInterval() {
			if (intervalPointer > 0) {
				intervalPointer--;
			}
		},
		toggleAutoPlay() {
			if (isPlaying) {
				cancelAnimationFrame(rafId);
				isPlaying = false;
				return;
			}
			isPlaying = true;
			actions.play();
		},
		toggleRules() {
			rulesModal = !rulesModal;
		},
		toggleAbout() {
			aboutModal = !aboutModal;
		},
	};

	const handleBgClick = e => {
		if (rulesModal) actions.toggleRules();
		if (aboutModal) actions.toggleAbout();
	};
</script>

<main>
	<h1>Conway's Game of Life</h1>
	<h2>Generation: {generation}</h2>
	<Grid sizeIndex={gridSize} {grid} {isPlaying} />
	<Controls {actions} bind:isPlaying bind:gridSize bind:intervalPointer />
	{#if rulesModal || aboutModal}
		<div class="modal-bg" on:click={handleBgClick} />
		{#if rulesModal}
			<Modal height="400px">
				<Rules />
			</Modal>
		{:else}
			<Modal>
				<About />
			</Modal>
		{/if}
	{/if}
</main>

<style>
	:root {
		font-size: 16px;
	}

	main {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgb(6, 30, 53);
		height: 100vh;
		position: relative;
	}

	main .modal-bg {
		position: absolute;
		background: rgba(0, 0, 0, 0.3);
		width: 100vw;
		height: 100vh;
	}

	h1,
	h2 {
		color: white;
		margin: 2rem;
	}

	h2 {
		color: rgba(207, 207, 207, 0.582);
		margin: 0;
		margin-bottom: 2rem;
	}
</style>
