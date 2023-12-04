<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<section
	class="fixed bottom-16 left-12 mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
>
	<h2 class="font-semibold text-gray-800 dark:text-white">🍪 Cookie Notice</h2>

	<p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
		We use cookies to ensure that we give you the best experience on our website.
		<a href="/privacy-policy" class="text-blue-500 hover:underline">Read cookies policies </a>.
	</p>

	<div class="mt-4 flex shrink-0 items-center justify-end gap-x-4">
		<button
			class="rounded-lg bg-gray-900 px-4 py-2.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none"
			on:click={() => {
				dispatch('accept');
			}}
		>
			Accept
		</button>
	</div>
</section>
