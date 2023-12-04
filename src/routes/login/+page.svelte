<script>
	import Logo from '$lib/components/shared/logo.svelte';
	import { setAlert } from '$lib/stores/alert.js';

	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = event.target;
		const data = new FormData(form);

		const valid = form.checkValidity();

		if (!valid || !data.get('username') || !data.get('password')) {
			setAlert({
				type: 'error',
				title: 'Error',
				message: 'Please fill all the fields'
			});
		} else {
			form.submit();
		}
	};
</script>

<svelte:head>
	<title>Login | Fake Store</title>
	<meta name="description" content="Login to your account" />
</svelte:head>
<hr />
<div
	class="mx-auto my-16 w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-transparent dark:bg-gray-800"
>
	<div class="px-6 py-4">
		<div class="mx-auto flex justify-center">
			<Logo />
		</div>

		<h3 class="mt-3 text-center text-xl font-medium text-gray-600 dark:text-gray-200">
			Welcome Back
		</h3>

		<p class="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

		<form method="POST" on:submit|preventDefault={handleSubmit}>
			<div class="mt-4 w-full">
				<input
					class="mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-300"
					placeholder="Username"
					aria-label="Username"
					name="username"
					value="jimmie_k"
				/>
			</div>

			<div class="mt-4 w-full">
				<input
					class="mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-300"
					type="password"
					placeholder="Password"
					aria-label="Password"
					name="password"
					value="klein*#%*"
				/>
			</div>

			<div class="mt-4 flex items-center justify-between">
				<a
					href="/forget-password"
					class="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-200"
				>
					Forget Password?
				</a>

				<button
					class="transform rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400"
				>
					Login
				</button>
			</div>
		</form>
	</div>

	<div class="flex items-center justify-center bg-gray-50 py-4 text-center dark:bg-gray-700">
		<span class="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

		<a
			href="/register"
			class="mx-2 text-sm font-bold text-blue-500 hover:underline dark:text-blue-400">Register</a
		>
	</div>
</div>
