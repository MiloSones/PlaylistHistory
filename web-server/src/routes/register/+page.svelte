<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>


<div>
	<h1>Register</h1>

	<ListErrors errors={form?.errors} />

	<form use:enhance method="POST">
		<fieldset>
			<input
				name="username"
				type="text"
				required
				placeholder="Username"
			/>
		</fieldset>
		<fieldset>
			<input
				name="password"
				type="password"
				required
				placeholder="Password"
			/>
		</fieldset>
		<button type="submit">Sign in</button>
	</form>
</div>