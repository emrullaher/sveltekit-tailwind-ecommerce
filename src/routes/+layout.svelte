<script>
	import '../app.css';

	import Header from '$lib/components/shared/layout/header.svelte';
	import Footer from '$lib/components/shared/layout/footer.svelte';
	import Alert from '$lib/components/shared/alert.svelte';
	import Cookies from '$lib/components/shared/cookies.svelte';

	import { onMount } from 'svelte';

	import { user } from '$lib/stores/auth.js';
	import { categories } from '$lib/stores/categories.js';
	import { products } from '$lib/stores/products.js';

	export let data;

	let cookiesDialog = false;
	let cookiesAccepted = false;

	user.set(data.user);
	categories.set(data.categories);
	products.set(data.products);

	onMount(() => {
		cookiesAccepted = window.localStorage.getItem('cookiesAccepted');
		cookiesDialog = !cookiesAccepted;

		/**
		 * Google Analytics Example
		 */
		// const script = document.createElement('script');
		// script.src = 'https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE';
		// script.async = true;
		// document.head.appendChild(script);
		// window.dataLayer = window.dataLayer || [];
		// function gtag() {
		// 	dataLayer.push(arguments);
		// }
		// gtag('js', new Date());
		// gtag('config', 'G-EXAMPLE');
		/**
		 * Facebook Pixel Example
		 */
		// const script = document.createElement('script');
		// script.src = 'https://connect.facebook.net/en_US/fbevents.js';
		// script.async = true;
		// document.head.appendChild(script);
		// window.fbq = function () {
		// 	window.fbq.callMethod
		// 		? window.fbq.callMethod.apply(window.fbq, arguments)
		// 		: window.fbq.queue.push(arguments);
		// };
		// if (!window._fbq) {
		// 	window.fbq.queue = [];
		// 	window._fbq = window.fbq;
		// }
		// window.fbq.push = window.fbq;
		// window.fbq.loaded = true;
		// window.fbq('init', 'FB-EXAMPLE');
		// window.fbq('track', 'PageView');
		/**
		 * Hotjar Example
		 */
		// const script = document.createElement('script');
		// script.src = 'https://static.hotjar.com/c/hotjar-EXAMPLE.js?sv=7';
		// script.async = true;
		// document.head.appendChild(script);
	});

	function acceptCookies() {
		window.localStorage.setItem('cookiesAccepted', true);
		cookiesAccepted = true;
		cookiesDialog = false;
	}
</script>

<div class="app bg-white dark:bg-gray-900">
	<Header />

	<slot />

	<Footer />

	<Alert />

	{#if cookiesDialog && !cookiesAccepted}
		<Cookies on:accept={acceptCookies} />
	{/if}
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
