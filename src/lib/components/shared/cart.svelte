<script>
	import { setAlert } from '$lib/stores/alert.js';
	import CartItem from '$lib/components/shared/cart-item.svelte';

	export let isCartDrawerOpen;

	import { onMount } from 'svelte';
	import { carts, getCarts, calculateTotalPrice, removeCart } from '$lib/stores/cart.js';

	onMount(async () => {
		await getCarts();
		calculateTotalPrice();
	});
</script>

<div
	id="drawer-right-example"
	class="fixed right-0 top-0 z-40 h-screen translate-x-full overflow-y-auto bg-white p-4 dark:bg-gray-900 md:min-w-[400px] md:max-w-[600px] {isCartDrawerOpen
		? 'transform-none'
		: 'transition-transform'}"
	tabindex="-1"
	aria-labelledby="drawer-right-label"
>
	<div class="flex h-full flex-col">
		<h5
			id="drawer-right-label"
			class="mb-4 inline-flex items-center text-xl font-semibold text-teal-600"
		>
			Cart
		</h5>
		<button
			type="button"
			data-drawer-hide="drawer-right-example"
			aria-controls="drawer-right-example"
			class="absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
			on:click={() => {
				isCartDrawerOpen = !isCartDrawerOpen;
			}}
		>
			<svg
				class="h-3 w-3"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
				/>
			</svg>
			<span class="sr-only">Close menu</span>
		</button>
		<hr />
		<div class="my-4 space-y-6 overflow-auto">
			{#if $carts && $carts.length}
				<ul class="space-y-4">
					{#each $carts as cart, i (`cart-${i}`)}
						<li
							class="flex items-center gap-4 border-b pb-2 {i !== $carts.length - 1
								? 'border-b-gray-300 '
								: 'border-b-transparent'}"
						>
							<CartItem
								{cart}
								on:product-click={(e) => {
									e.preventDefault();
									isCartDrawerOpen = !isCartDrawerOpen;
								}}
								on:remove={(e) => {
									e.preventDefault();
									removeCart(cart);
									setAlert({
										title: 'Success',
										message: 'Item removed from cart',
										type: 'success'
									});
								}}
							/>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="text-center">
					<p class="text-gray-600">Your cart is empty.</p>
				</div>
			{/if}
		</div>

		<div class="mt-auto space-y-4 text-center">
			{#if $carts && $carts.length}
				<a
					href="/cart"
					class="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400 dark:border-gray-300 dark:text-gray-300 hover:dark:bg-gray-300 hover:dark:text-black"
					on:click={() => {
						isCartDrawerOpen = !isCartDrawerOpen;
					}}
				>
					View my cart ({$carts.length})
				</a>

				<a
					href="/coming-soon"
					class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 dark:bg-teal-600"
				>
					Checkout
				</a>
			{:else}
				<a
					href="/products"
					class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 dark:bg-teal-600"
					on:click={() => {
						isCartDrawerOpen = !isCartDrawerOpen;
					}}
				>
					Shop now
				</a>
			{/if}

			<a
				href="javascript:void(0)"
				class="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600 dark:text-gray-300"
				on:click={() => {
					isCartDrawerOpen = !isCartDrawerOpen;
				}}
			>
				Continue shopping
			</a>
		</div>
	</div>
</div>
<div
	class="fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80 {isCartDrawerOpen
		? 'd-block'
		: 'hidden'}"
	on:click={() => {
		isCartDrawerOpen = !isCartDrawerOpen;
	}}
></div>
