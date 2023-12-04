<script>
	export let categories;
</script>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
	{#each categories as category, i (`category-${i}`)}
		<div class="group relative overflow-hidden rounded-sm">
			<img
				class="h-full w-full transform object-cover transition group-hover:scale-110"
				src={`/images/categories/${category}.jpg`}
				alt={category}
			/>
			<a
				class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 font-roboto text-xl font-medium capitalize text-white transition group-hover:bg-opacity-60"
				href={`/products?category=${category}`}
				data-sveltekit-preload-data="off"
			>
				{category}
			</a>
		</div>
	{/each}
</div>
