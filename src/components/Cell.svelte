<script>
	import { DEAD_CELL_COLOR, SIZES } from "../lib/config";

	export let isAlive = false;
	export let bg = DEAD_CELL_COLOR;
	export let sizeIndex = 0;

	$: cellSize = SIZES[sizeIndex].cell;
</script>

<div
	class:alive={isAlive}
	style="--bg:{bg};--cell-size:{cellSize}"
	on:mouseover
	on:mousedown />

<style>
	:root {
		--cell-size: 0.25rem;
	}
	div {
		width: var(--cell-size);
		height: var(--cell-size);
		background-color: var(--bg);
		transition: background-color 0.1s ease-out;
		border-radius: 25%;
		margin: 1px;
	}

	div:hover {
		cursor: pointer;
	}

	.alive {
		background-color: var(--bg);
	}
</style>
