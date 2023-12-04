<script>
	import ProductCard from '$lib/components/product/card.svelte';
	import ProductFilters from '$lib/components/product/filters.svelte';

	import { products } from '$lib/stores/products.js';
	import { categories } from '$lib/stores/categories.js';

	import { BRANDS, COLORS, RATINGS, SIZES } from '$lib/utils/constants.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let grid = false;
	let isDrawerOpen = false;

	let filteredProducts = JSON.parse(JSON.stringify($products));

	let defaultFilters = {
		categories: $categories.map((category) => ({
			name: category,
			value: category,
			type: 'select',
			checked: false
		})),
		brands: BRANDS.map((brand) => ({
			...brand,
			type: 'select',
			checked: false
		})),
		size: SIZES.map((size) => ({
			...size,
			type: 'size',
			checked: false
		})),
		color: COLORS.map((color) => ({
			...color,
			type: 'color',
			checked: false
		})),
		rating: RATINGS.map((rating) => ({
			...rating,
			type: 'rating',
			checked: false
		}))
	};

	if ($page.url.searchParams.get('category')) {
		defaultFilters.categories = defaultFilters.categories.map((category) => {
			if (category.value === $page.url.searchParams.get('category')) {
				category.checked = true;
			}
			return category;
		});
	}

	let filters = JSON.parse(JSON.stringify(defaultFilters));

	onMount(() => {
		filterProducts();
	});

	onMount(() => {
		const unsubscribe = page.subscribe(() => {
			filterProducts();
		});

		return () => {
			unsubscribe();
		};
	});

	/**
	 * Filter products based on selected filters
	 * @returns {void}
	 */
	const filterProducts = () => {
		const categories = $page.url.searchParams.get('category');

		if (categories) {
			filters.categories = filters.categories.map((category) => {
				if (categories.split(',').includes(category.value)) {
					category.checked = true;
				} else {
					category.checked = false;
				}
				return category;
			});
		}

		const _products = JSON.parse(JSON.stringify($products));

		filteredProducts = _products.filter((product) => {
			const selectedCategories = filters.categories.filter((x) => x.checked).map((x) => x.value);
			const selectedBrands = filters.brands.filter((x) => x.checked).map((x) => x.value);
			const selectedSizes = filters.size.filter((x) => x.checked).map((x) => x.value);
			const selectedColors = filters.color.filter((x) => x.checked).map((x) => x.value);
			const selectedRatings = filters.rating.filter((x) => x.checked).map((x) => x.value);

			const categoryPass =
				!selectedCategories.length || selectedCategories.includes(product.category);
			const brandPass = !selectedBrands.length || selectedBrands.includes(product.brand);
			const sizePass = !selectedSizes.length || selectedSizes.some((size) => product.size === size);
			const colorPass =
				!selectedColors.length || selectedColors.some((color) => product.color === color);

			const ratingPass =
				!selectedRatings.length ||
				selectedRatings.some((rating) => Math.round(product.rating.rate) === parseInt(rating));

			return categoryPass && brandPass && sizePass && colorPass && ratingPass;
		});
	};

	const handleFilterChange = (e) => {
		filters = e.detail;
		const checkedCategories = filters.categories.filter((x) => x.checked);
		if (checkedCategories && checkedCategories.length) {
			$page.url.searchParams.set('category', checkedCategories.map((x) => x.value).join(','));
			goto(`?${$page.url.searchParams.toString()}`);
		} else {
			$page.url.searchParams.delete('category');
		}

		filterProducts();
	};

	const clearFilters = () => {
		filters = JSON.parse(JSON.stringify(defaultFilters));
		filterProducts();
	};

	const handleDrawerClick = () => {
		isDrawerOpen = !isDrawerOpen;
		document.body.classList.toggle('overflow-hidden');
	};

	$: totalProducts = filteredProducts.length;
</script>

<svelte:head>
	<title>Products</title>
	<meta name="description" content="Products page" />
</svelte:head>

<hr />
<div class="container grid grid-cols-2 items-start gap-6 pb-16 pt-4 md:grid-cols-4">
	<div class="text-center md:hidden">
		<button
			class="mb-2 mr-2 block rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:hidden"
			type="button"
			data-drawer-target="drawer-example"
			data-drawer-show="drawer-example"
			aria-controls="drawer-example"
			on:click={handleDrawerClick}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-filter"
				viewBox="0 0 16 16"
			>
				<path
					d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
				/>
			</svg>
		</button>
	</div>

	<div
		class="fixed left-0 top-0 z-40 h-screen w-80 overflow-y-auto border border-gray-200 bg-white shadow transition-transform dark:border-gray-600 dark:bg-gray-900 {isDrawerOpen
			? 'right-0'
			: '-translate-x-full'}"
		tabindex="-1"
		aria-labelledby="drawer-label"
	>
		<div class="sticky top-0 bg-white px-4 pb-2 pt-4 dark:bg-gray-900">
			<h5
				id="drawer-label"
				class="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
			>
				<svg
					class="mr-2 h-5 w-5"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					></path>
				</svg>
				Filters
			</h5>
			<button
				type="button"
				class="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
				on:click={handleDrawerClick}
			>
				<svg
					aria-hidden="true"
					class="h-5 w-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					></path></svg
				>
				<span class="sr-only">Close menu</span>
			</button>
		</div>

		<ProductFilters on:filterChange={handleFilterChange} bind:filters />
	</div>
	<div
		class="fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80 {isDrawerOpen
			? 'd-block'
			: 'hidden'}"
		on:click={handleDrawerClick}
	></div>

	<div
		class="hidden rounded border border-gray-200 bg-white shadow dark:border-gray-600 dark:bg-gray-900 md:block"
	>
		<ProductFilters on:filterChange={handleFilterChange} bind:filters />
	</div>
	<!-- products -->
	<div class="col-span-3">
		{#if totalProducts > 0}
			<div class="mb-4 flex items-center">
				<p class="dark:text-gray-300">{totalProducts} Product Showing</p>
				<div class="ml-auto flex gap-2">
					<div
						class="{grid
							? 'border-primary bg-primary text-white'
							: ' border-gray-300 text-gray-600'}
						flex h-9 w-10 cursor-pointer items-center justify-center rounded border dark:text-white"
						on:click={() => {
							grid = true;
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"
							/>
						</svg>
					</div>
					<div
						class="{!grid
							? 'bg-primary text-white'
							: 'border border-gray-300 text-gray-600'} flex h-9 w-10 cursor-pointer items-center justify-center rounded border dark:text-white"
						on:click={() => {
							grid = false;
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"
							/>
						</svg>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex h-96 flex-col items-center justify-center">
				<p class="text-2xl font-semibold text-gray-500 dark:text-gray-300">No products found</p>
				<button
					class="ml-2 block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
					on:click={clearFilters}
				>
					Clear all filters
				</button>
			</div>
		{/if}

		<div class="grid grid-cols-1 gap-6 {grid ? 'sm:grid-cols-2 xl:grid-cols-3' : ''}">
			{#each filteredProducts as product, i (`product-${i}`)}
				<ProductCard {product} {grid} />
			{/each}
		</div>
	</div>

	<!-- ./products -->
</div>
