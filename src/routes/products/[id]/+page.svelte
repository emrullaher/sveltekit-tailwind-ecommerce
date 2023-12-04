<script>
	import { products, product } from '$lib/stores/products.js';
	import ProductCard from '$lib/components/product/card.svelte';
	import Breadcrumb from '$lib/components/shared/breadcrumb.svelte';

	import { shuffleArray } from '$lib/utils/shuffle-array.js';

	$: relatedProducts = shuffleArray($products)
		.filter((p) => p.id !== $product.id)
		.slice(0, 4);

	let images = [];

	let price = 0;
	let discountPrice = 0;
	let quantity = 1;

	const setPrice = () => {
		price = $product.price * quantity;
		discountPrice = $product.price + 399 * quantity;
	};

	// watch product
	$: {
		images = [
			{ src: $product.image, alt: $product.title, isSelected: true },
			{ src: 'https://random.imagecdn.app/1200/1200', alt: $product.title, isSelected: false },
			{ src: 'https://picsum.photos/1200/1200', alt: $product.title, isSelected: false }
		];

		setPrice();

		quantity = 1;
	}

	import { setAlert } from '$lib/stores/alert.js';
	import { addToCart } from '$lib/stores/cart.js';
</script>

<svelte:head>
	<title>{$product.title}| Fake Store</title>
	<meta name="description" content={$product.description} />
</svelte:head>

<hr />

<Breadcrumb
	breadcrumbs={[
		{
			name: 'products',
			url: `/products?category=${$product.category}`
		},
		{
			name: $product.title,
			url: `/products/${$product.id}`
		}
	]}
></Breadcrumb>

<!-- product-detail -->
<div class="container mt-10 grid gap-6 md:grid-cols-2">
	{#if images && images.length}
		<div>
			<div class="bg-white py-2">
				<img
					src={images.find((x) => x.isSelected === true).src}
					alt={images.find((x) => x.isSelected === true).alt}
					class="mx-auto aspect-square"
					style="max-height: 400px"
				/>
			</div>
			<div class="mt-16 grid grid-cols-5 gap-4">
				{#each images as image, i}
					<div>
						<img
							src={image.src}
							alt={image.alt}
							class="bg-white {image.isSelected === true
								? 'product-image border-teal-900 dark:border-red-600'
								: 'product-image'}"
							on:click={() => {
								images = images.map((x) => ({ ...x, isSelected: false }));
								images[i].isSelected = true;
							}}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<div>
		<div class="mb-5">
			<h2
				class="mr-2 text-2xl font-bold uppercase text-orange-800 dark:text-orange-600 lg:text-3xl"
			>
				{$product.title}
			</h2>
			<div class="mt-4 flex items-center">
				<div class="flex gap-1 text-sm text-yellow-400">
					{#each [1, 2, 3, 4, 5] as rating, i}
						<svg
							class="h-4 w-4 {i < Math.round($product.rating.rate)
								? 'text-yellow-300'
								: 'text-gray-300'}"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
							data-rate={rating}
						>
							<path
								d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
							/>
						</svg>
					{/each}
				</div>
			</div>
		</div>
		<div class="space-y-2">
			<p class="inline-flex w-[100%] space-x-2 align-middle font-semibold text-gray-800">
				<span class="min-w-[100px] font-semibold text-gray-800 dark:text-gray-300">
					Availability:
				</span>
				<span class="text-green-600">In Stock</span>
			</p>
			<p class="inline-flex w-[100%] space-x-2 align-middle">
				<span class="min-w-[100px] font-semibold text-gray-800 dark:text-gray-300">Brand: </span>
				<span class="capitalize text-gray-600 dark:text-gray-400">{$product.brand}</span>
			</p>
			<p class="inline-flex w-[100%] space-x-2 align-middle">
				<span class="min-w-[100px] font-semibold text-gray-800 dark:text-gray-300">Category: </span>
				<span class="capitalize text-gray-600 dark:text-gray-400">{$product.category}</span>
			</p>
			<p class="inline-flex w-[100%] space-x-2 align-middle">
				<span class="min-w-[100px] font-semibold text-gray-800 dark:text-gray-300">SKU: </span>
				<span class="text-gray-600 dark:text-gray-400">
					{Math.random().toString(36).substring(2, 10).toUpperCase()}
				</span>
			</p>
			<p class="inline-flex w-[100%] space-x-2 align-middle font-semibold text-gray-800">
				<span class="min-w-[100px] font-semibold text-gray-800 dark:text-gray-300">Color: </span>
				<span
					class="block h-6 w-6 rounded-sm border border-gray-200 shadow-sm"
					style={`background-color: ${$product.color};`}
				></span>
			</p>
			<p class="inline-flex w-[100%] space-x-2 align-middle font-semibold text-gray-800">
				<span class="min-w-[100px] font-semibold text-gray-800 dark:text-gray-300">Size: </span>
				<span
					class="flex h-6 w-6 items-center justify-center rounded-sm border border-gray-200 text-xs uppercase text-gray-600 shadow-sm dark:text-gray-400"
				>
					{$product.size}
				</span>
			</p>
		</div>
		<div class="my-5 border-y border-y-gray-300 py-5 dark:border-y-transparent">
			<span class="min-w-[100px] font-semibold text-gray-800 dark:text-gray-300"
				>Description:
			</span>
			<p class="text-gray-600 dark:text-gray-400">
				{$product.description}
			</p>
		</div>
		<div class="flex justify-between pt-4 align-middle">
			<div>
				<h3 class="text-md mb-1 font-medium uppercase text-gray-800 dark:text-white">Quantity</h3>
				<div class="custom-number-input h-10 w-32">
					<div class="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
						<button
							data-action="decrement"
							class=" h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700 dark:text-gray-400"
							on:click={() => {
								if (quantity > 1) quantity--;
								setPrice();
							}}
						>
							<span class="m-auto text-2xl font-thin">−</span>
						</button>
						<input
							type="number"
							class="text-md md:text-basecursor-default flex w-full items-center bg-gray-300 text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none"
							name="custom-input-number"
							value={quantity}
							on:keyup={(e) => {
								const value = parseInt(e.target.value);
								if (value > 0) {
									quantity = value;
									setPrice();
								}
							}}
							on:blur={(e) => {
								const value = parseInt(e.target.value || '0');
								if (value <= 0) {
									e.target.value = 1;
									quantity = 1;
									setPrice();
								}
							}}
						/>
						<button
							data-action="increment"
							class="h-full w-20 cursor-pointer rounded-r bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700 dark:text-gray-400"
							on:click={() => {
								quantity++;
								setPrice();
							}}
						>
							<span class="m-auto text-2xl font-thin">+</span>
						</button>
					</div>
				</div>
			</div>

			<div class="mb-1 mt-4 text-right">
				<p class="text-[14px] text-gray-400 line-through">
					{discountPrice}$
				</p>
				<p class="text-3xl font-semibold text-blue-700">{price}$</p>
			</div>
		</div>
		<div class="gap-3 pb-5 pt-5 text-right">
			<a
				href="javascript:void(0)"
				class="inline-flex items-center gap-2 rounded border border-teal-600 bg-teal-600 px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-teal-600"
				on:click={() => {
					addToCart($product, quantity);
					setAlert({ title: 'Success', message: 'Product added to cart', type: 'success' });
				}}
			>
				<svg
					class="bi bi-cart"
					fill="currentColor"
					height="16"
					viewBox="0 0 16 16"
					width="16"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
					></path>
				</svg>
				Add to cart
			</a>
		</div>
	</div>
</div>
<!-- ./product-detail -->

<!-- Related Products -->
<div class="container mt-16 pb-16">
	<h2 class="mb-6 text-2xl font-medium uppercase text-gray-800 dark:text-white">
		Related products
	</h2>
	<div class="grids-cols:1 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
		{#each relatedProducts as product, i (`product-${i}`)}
			<ProductCard {product} />
		{/each}
	</div>
</div>

<!-- ./Related Products -->

<style>
	.product-image {
		@apply aspect-square w-full cursor-pointer border p-2;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.custom-number-input input:focus {
		outline: none !important;
	}

	.custom-number-input button:focus {
		outline: none !important;
	}
</style>
