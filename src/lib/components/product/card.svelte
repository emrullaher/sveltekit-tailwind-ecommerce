<script>
	import { addToCart } from '$lib/stores/cart.js';
	import { setAlert } from '$lib/stores/alert.js';

	/**
	 * @type {product}
	 */
	export let product;

	export let grid = true;

	const getDesc = () => {
		if (!grid) return product.description;

		if (product.description.length > 100) {
			return `${product.description.substring(0, 100)}...`;
		}
		return product.description;
	};
</script>

<a
	data-sveltekit-preload-data="off"
	href={`/products/${product.id}`}
	class="flex h-full overflow-hidden rounded-lg bg-white shadow-lg dark:border dark:border-gray-400 dark:bg-transparent {grid
		? 'flex-col'
		: 'flex-col sm:flex-row'}"
>
	<div class="bg-white p-6 {grid ? 'p-4' : 'w-full sm:w-1/4'}">
		<div
			class="bg-contain bg-center bg-no-repeat {grid ? 'h-[240px]' : 'h-[150px] w-full'}"
			style="background-image: url({product.image})"
		></div>
	</div>
	<div class="flex h-full flex-col p-4 {grid ? '' : 'sm:w-3/4'}">
		<h1 class="text-md font-bold text-gray-900 dark:text-white md:text-2xl">{product.title}</h1>
		<p class="mb-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
			{getDesc()}
		</p>
		<div class="item-center mt-auto flex">
			{#each [1, 2, 3, 4, 5] as rating, i}
				<svg
					data-rate={rating}
					class="h-5 w-5 fill-current {i < Math.round(product.rating.rate)
						? 'text-yellow-300'
						: 'text-gray-300'}"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
					/>
				</svg>
			{/each}
		</div>
		<div class="item-center mt-2 flex flex-wrap justify-between">
			<h1 class="text-xl font-bold text-gray-700 dark:text-gray-300">{product.price}$</h1>
			<button
				on:click|preventDefault={() => {
					addToCart(product, 1);
					setAlert({ title: 'Success', message: 'Product added to cart', type: 'success' });
				}}
				class="rounded bg-gray-800 p-3 text-xs font-bold uppercase text-white"
			>
				Add to Card
			</button>
		</div>
	</div>
</a>
