<script>
	export let height = "700px";

	console.log({ height });
</script>

<div class="modal" style="--height: {height};">
	<slot />
</div>

<style>
	.modal {
		place-self: center;
		padding: 2rem;
		border-radius: 8px;
		background-color: aliceblue;
		height: min(var(--height), 80vh);
		width: min(700px, 50vw);

		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
