<script>
	import FaSync from "svelte-icons/fa/FaSync.svelte";
	import FaRandom from "svelte-icons/fa/FaRandom.svelte";
	import FaPlay from "svelte-icons/fa/FaPlay.svelte";
	import FaPause from "svelte-icons/fa/FaPause.svelte";
	import FaMinus from "svelte-icons/fa/FaMinus.svelte";
	import FaPlus from "svelte-icons/fa/FaPlus.svelte";

	import { SIZES, INTERVALS } from "../lib/config";

	import Button from "./Button.svelte";

	const NO_OP = () => {};

	export let isPlaying = false;
	export let gridSize = 0;
	export let intervalPointer = 0;

	export let actions = {
		reset: NO_OP,
		random: NO_OP,
		toggleAutoPlay: NO_OP,
		incrementGridSize: NO_OP,
		decrementGridSize: NO_OP,
		incrementInterval: NO_OP,
		decrementInterval: NO_OP,
		toggleRules: NO_OP,
		toggleAbout: NO_OP,
	};

	let buttonSize = "2rem";
</script>

<div class="controls">
	<Button
		w="8rem"
		bg="rgba(255,255,255,0.8)"
		label="rules"
		fontColor="rgb(6, 30, 53)"
		on:click={actions.toggleRules}>
		RULES
	</Button>
	<div class="controls--primary">
		<Button
			bg="#555555"
			label="reset"
			on:click={actions.reset}
			disabled={isPlaying}>
			<div class="control-icon">
				<FaSync />
			</div>
		</Button>
		<Button
			bg="#7E7E7E"
			label="random"
			on:click={actions.random}
			disabled={isPlaying}>
			<div class="control-icon">
				<FaRandom />
			</div>
		</Button>

		<Button
			bg={isPlaying ? '#F13838' : '#16BA62'}
			label={isPlaying ? 'pause' : 'play'}
			on:click={actions.toggleAutoPlay}>
			<div class="control-icon">
				<svelte:component this={isPlaying ? FaPause : FaPlay} />
			</div>
		</Button>
	</div>
	<Button
		w="8rem"
		bg="rgba(255,255,255,0.8)"
		label="rules"
    fontColor="rgb(6, 30, 53)"
    on:click={actions.toggleAbout}
    >
		ABOUT
	</Button>
</div>

<div class="grid-render-controls">
	<Button
		{buttonSize}
		disabled={isPlaying || gridSize < 1}
		bg="#555"
		on:click={actions.decrementGridSize}
		label="decrease grid size">
		<div class="control-icon">
			<FaMinus style="transform:scale(1.5)" />
		</div>
	</Button>

	<span>Grid Size - {SIZES[gridSize].grid}</span>

	<Button
		{buttonSize}
		disabled={isPlaying || gridSize >= SIZES.length - 1}
		bg="#555"
		on:click={actions.incrementGridSize}
		label="increase grid size">
		<div class="control-icon">
			<FaPlus />
		</div>
	</Button>
</div>

<div class="grid-render-controls">
	<Button
		{buttonSize}
		disabled={isPlaying || intervalPointer < 1}
		bg="#555"
		on:click={actions.decrementInterval}
		label="decrease grid size">
		<div class="control-icon">
			<FaMinus style="transform:scale(1.5)" />
		</div>
	</Button>

	<span>Interval - {INTERVALS[intervalPointer].interval}ms</span>

	<Button
		{buttonSize}
		disabled={isPlaying || intervalPointer >= INTERVALS.length - 1}
		bg="#555"
		on:click={actions.incrementInterval}
		label="increase grid size">
		<div class="control-icon">
			<FaPlus />
		</div>
	</Button>
</div>

<style>
	.controls {
		margin-top: 2rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		width: 1000px;
	}

	.controls--primary {
		display: flex;
		justify-content: space-between;
		width: 20rem;
	}

	.control-icon {
		height: 1rem;
	}

	.grid-render-controls {
		display: flex;
		width: 310px;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.grid-render-controls span {
		color: rgba(207, 207, 207, 0.582);
		font-size: 1.5rem;
	}
</style>
