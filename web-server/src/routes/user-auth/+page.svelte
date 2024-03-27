<script>
    export let data;
</script>

<h1>User Auth</h1>

{#if data?.user}
    <h1>Logged in as user: {data?.user?.username}</h1>
    <form method="POST" action="?/logout">
        <button type="submit">Log Out</button>
    </form>
    <form method="POST" action="?/delete">
        <button type="submit">Delete Account</button>
    </form>
{:else}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
{/if}