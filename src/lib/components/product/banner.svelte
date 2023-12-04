<script>
	import image from '$lib/images/banner.jpg';

	const scrollToProducts = () => {
		const products = document.getElementById('products');
		if (products) {
			window.scrollTo({ top: products.offsetTop - 150, behavior: 'smooth' });
		} else {
			window.scrollTo({ top: 500, behavior: 'smooth' });
		}
	};
</script>

<section style="background-image: url({image})" class="relative bg-cover bg-center bg-no-repeat">
	<div
		class="absolute inset-0 bg-white/75 dark:bg-gray-500/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25 rtl:sm:bg-gradient-to-l dark:sm:from-gray-700/95 dark:sm:to-gray-700/25"
	></div>

	<div
		class="relative mx-auto px-4 py-32 lg:container sm:px-6 lg:flex lg:h-1/2 lg:items-center lg:px-8"
	>
		<div class="max-w-xl text-center sm:text-left rtl:sm:text-right">
			<h1 class="text-3xl font-extrabold dark:text-white sm:text-5xl">
				Explore the Infinite,

				<strong class="block font-extrabold text-rose-700"> All in One Place </strong>
			</h1>

			<p class="mt-4 max-w-lg dark:text-gray-300 sm:text-xl/relaxed">
				Explore a world of choices that cater to your every need. Discover the best in fashion,
				electronics, home essentials, and more. Start your journey to excellence today!
			</p>

			<div class="mt-8 flex flex-wrap gap-4 text-center">
				<button
					on:click={scrollToProducts}
					class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none active:bg-rose-500 sm:w-auto"
				>
					Get Started
				</button>

				<a
					href="/about"
					class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none active:text-rose-500 sm:w-auto"
				>
					Learn More
				</a>
			</div>
		</div>
	</div>
</section>
