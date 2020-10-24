<script>
	import { opacify, lighten } from "polished";

	export let label;
	export let bg = "#333";
	export let disabled = false;
	export let buttonSize = "3.75rem";
	export let h = null;
	export let w = null;
	export let fontColor = "#FFF";

	$: background = lighten(0.05, bg);
	$: borderColor = opacify(-0.6, bg);
</script>

<button
	on:click
	{disabled}
	style="--color:{background};--border-color:{borderColor};--button-size:{buttonSize};--button-h:{h};--button-w:{w};--font-color:{fontColor};"
	aria-label={label}
	class:w
	class:h>
	<slot>{label}</slot>
</button>

<style>
	button {
		color: var(--font-color);
    background-color: var(--color);
    font-weight: 600;
		border: none;
		width: var(--button-size);
		height: var(--button-size);
		outline: none;
		transition: all 200ms ease-in-out;
		cursor: pointer;
		padding: 0.25rem;
	}

	button.w {
		width: var(--button-w);
	}

	button.h {
		height: var(--button-h);
	}

	button:hover {
		box-shadow: 0 0 0 4px var(--border-color);
		border-width: 2px;
	}

	button:focus {
		box-shadow: 0 0 0 4px var(--border-color);
		font-weight: 600;
	}

	button:disabled {
		background-color: var(--border-color);
		box-shadow: none;
		cursor: not-allowed;
	}
</style>
