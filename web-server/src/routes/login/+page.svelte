<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>


<div>
	<h1>Sign In</h1>
	<p>
		<a href="/register">Need an account?</a>
	</p>

	<ListErrors errors={form?.errors} />

	<form use:enhance method="POST">
		<fieldset>
			<input
				name="email"
				type="email"
				required
				placeholder="Email"
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