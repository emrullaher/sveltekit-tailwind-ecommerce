<script>
	import CartItem from '$lib/components/shared/cart-item.svelte';

	import {
		carts,
		totalPrice,
		removeCart,
		getCarts,
		calculateTotalPrice
	} from '$lib/stores/cart.js';
	import { onDestroy, onMount } from 'svelte';
	import { setAlert } from '$lib/stores/alert.js';

	let subTotal = 0;
	let vat = 20;
	let discount = 0;
	let total = 0;

	onMount(async () => {
		await getCarts();
		calculateTotalPrice();
	});

	const unsubscribe = totalPrice.subscribe((value) => {
		if (value) {
			subTotal = value;
			discount = Math.round(subTotal * 0.2);
			total = (subTotal + vat - discount).toFixed(2);
		}
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<title>Cart | Fake Store</title>
	<meta name="description" content="Shopping cart page for Fake Store" />
</svelte:head>
<hr />

<section class="py-5">
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<header class="text-center">
				<h1 class="text-xl font-bold text-gray-900 dark:text-gray-300 sm:text-3xl">Your Cart</h1>
			</header>

			<div class="mt-8">
				{#if $carts && $carts.length > 0}
					<ul class="space-y-4">
						{#each $carts as cart, i (`cart-${i}`)}
							<li
								class="flex items-center gap-4 border-b pb-2 {i !== $carts.length - 1
									? 'border-b-gray-300 '
									: 'border-b-transparent'}"
							>
								<CartItem
									{cart}
									on:onRemove={() => {
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
				<div class="mt-8 flex justify-end pt-8">
					<div class="w-screen max-w-lg space-y-4">
						<dl class="space-y-0.5 text-sm text-gray-700 dark:text-gray-400">
							<div class="flex justify-between">
								<dt>Subtotal</dt>
								<dd>{subTotal}$</dd>
							</div>

							<div class="flex justify-between">
								<dt>VAT</dt>
								<dd>{vat}$</dd>
							</div>

							<div class="flex justify-between">
								<dt>Discount</dt>
								<dd>-{discount}$</dd>
							</div>

							<div class="flex justify-between !text-base font-medium">
								<dt>Total</dt>
								<dd>{total}$</dd>
							</div>
						</dl>

						<div class="flex justify-end">
							<span
								class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="-ms-1 me-1.5 h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
									/>
								</svg>

								<p class="whitespace-nowrap text-xs">%20 Discount Applied</p>
							</span>
						</div>

						<div class="flex justify-end">
							<a
								href="/coming-soon"
								class="block rounded bg-teal-600 px-5 py-3 text-sm text-gray-100 transition"
							>
								Checkout
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
