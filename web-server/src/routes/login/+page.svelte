<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>


<p>Login Page</p>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>
				<p class="text-xs-center">
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
		</div>
	</div>
</div>