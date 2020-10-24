<script>
	import { DEAD_CELL_COLOR, ALIVE_CELL_COLOR } from "../lib/config";

	import Cell from "./Cell.svelte";

	export let grid = [];
	export let sizeIndex = 0;
	export let isPlaying;

	const handleMouseEvent = ({ y, x }) => (e) => {
		if (e.button === 0 && e.buttons === 1) {
			grid[y][x] = !grid[y][x];
		}
	};
</script>

<div class="grid-container">
	{#each grid as cells, y}
		<div class="row">
			{#each cells as isAlive, x}
				<Cell
					{sizeIndex}
					{isAlive}
					on:mouseover={!isPlaying ? handleMouseEvent({
								y,
								x,
						  }) : null}
					on:mousedown={!isPlaying ? handleMouseEvent({
								y,
								x,
						  }) : null}
					bg={isAlive ? ALIVE_CELL_COLOR : DEAD_CELL_COLOR} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.row {
		flex: 1;
		display: flex;
	}
</style>
