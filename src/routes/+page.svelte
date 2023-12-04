<script>
	import Banner from '$lib/components/product/banner.svelte';
	import ProductSlider from '$lib/components/product/slider.svelte';
	import CategoriesCard from '$lib/components/categories/card.svelte';
	import Partners from '$lib/components/shared/partners.svelte';
	import MobileApps from '$lib/components/shared/mobile-apps.svelte';
	import Features from '$lib/components/shared/features.svelte';

	import { categories } from '$lib/stores/categories';
	import { products } from '$lib/stores/products';
</script>

<svelte:head>
	<title>Best Online Shopping Store | Free Shipping | 100% Refund</title>
	<meta
		name="description"
		content="Shop online for Electronics, Fashion, Home & Kitchen, Beauty & Grooming, Health, Toys, Baby, Books, Sports, etc. on desertcart. ✓Secure Shopping Platform ✓70M+ Products ✓FREE Delivery ✓FREE Returns"
	/>
</svelte:head>

<Banner />

<Features />

<section>
	<div class="mx-auto px-4 md:p-16">
		<header>
			<div class="mx-auto max-w-3xl text-center md:mb-12">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
					Featured Products
				</h2>
			</div>
		</header>

		{#if $products && $products.length}
			<ProductSlider products={$products} />
		{/if}

		<div class="mt-16 text-center">
			<a
				class="rounded-md bg-blue-950 px-10 py-2.5 text-lg font-medium text-white transition"
				href={`/products`}
			>
				Show All
			</a>
		</div>
	</div>
</section>

{#if $categories && $categories.length}
	<div class="container mx-auto py-16">
		<h2 class="mb-6 text-2xl font-medium uppercase text-gray-800 dark:text-white">
			Shop by category
		</h2>
		<CategoriesCard categories={$categories} />
	</div>
{/if}

<section class="py-10">
	<Partners />
</section>

<MobileApps />
