<script>
	import { rules } from "../lib/rules";
</script>

<h1>Rules</h1>
<ul>
	{#each rules as rule}
		<li key={rule}>{rule}</li>
	{/each}
</ul>

<style>
	:root {
		display: flex;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-items: flex-start;
	}

	li {
    margin: 1rem;
    text-align: start;
	}
</style>
