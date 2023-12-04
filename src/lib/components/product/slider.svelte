<script>
	import { shuffleArray } from '$lib/utils/shuffle-array.js';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import ProductCard from '$lib/components/product/card.svelte';

	export let products;

	const _products = JSON.parse(JSON.stringify(products));
	$: shuffledProducts = shuffleArray(_products).splice(0, 5);

	const options = {
		gap: '1rem',
		autoplay: false,
		arrows: false,
		pagination: {
			dots: true
		},
		isNavigation: false,
		perPage: 4,
		autoHeight: true,
		breakpoints: {
			560: {
				perPage: 1
			},
			768: {
				perPage: 2
			},
			1600: {
				perPage: 3
			}
		}
	};
</script>

<Splide id="products" aria-label="Product Images" class="py-5" {options}>
	{#each shuffledProducts as product, i (`product-${i}`)}
		<SplideSlide class="py-5">
			<ProductCard {product} />
		</SplideSlide>
	{/each}
</Splide>

<style lang="scss">
	:global(.splide__pagination__page) {
		background: #a0a0a0 !important;
	}

	:global(.splide__pagination__page.is-active) {
		background: #0d9488 !important;
	}
</style>
