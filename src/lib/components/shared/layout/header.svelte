<script>
	import Cart from '$lib/components/shared/cart.svelte';
	import Logo from '$lib/components/shared/logo.svelte';
	import UserMenu from '$lib/components/shared/user-menu.svelte';

	import { categories } from '$lib/stores/categories.js';
	import { carts } from '$lib/stores/cart.js';
	import { user } from '$lib/stores/auth.js';

	let isAuthenticated;

	let isCartDrawerOpen = false;

	let darkMode = false;
	let isMenuOpen = false;

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		const theme = window.localStorage.getItem('color-theme');
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
			darkMode = true;
		}
	});

	const toggleDarkMode = () => {
		if (darkMode) {
			document.documentElement.classList.remove('dark');
			window.localStorage.setItem('color-theme', 'light');
			darkMode = false;
		} else {
			document.documentElement.classList.add('dark');
			window.localStorage.setItem('color-theme', 'dark');
			darkMode = true;
		}
	};

	$: {
		isAuthenticated = $user;
	}

	$: currentCategory = $page.url?.searchParams?.get('category') || '';
</script>

<nav class="relative bg-white shadow dark:bg-gray-800">
	<div class="container mx-auto flex items-center justify-between px-6 py-4">
		<a href="/">
			<Logo />
		</a>
		<div class="flex items-center justify-between md:order-2">
			<div class="flex items-center justify-center">
				<button
					on:click={toggleDarkMode}
					aria-label="theme switching"
					type="button"
					class="group mr-3 flex h-9 w-9 max-w-[2.25rem] items-center justify-center rounded-lg border border-gray-200/40 bg-gray-100/20 dark:border-gray-700/40 dark:bg-gray-800/20"
				>
					{#if darkMode}
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="relative hidden h-5 w-5 text-white duration-300 group-hover:rotate-180 dark:inline-block"
							><path
								d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
							></path>
						</svg>
					{:else}
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="relative h-4 w-4 text-gray-700 duration-500 group-hover:rotate-[360deg] group-hover:text-gray-900 dark:hidden"
							><path
								fill-rule="evenodd"
								d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
								clip-rule="evenodd"
							></path>
						</svg>
					{/if}
				</button>
				<a
					on:click={() => {
						isCartDrawerOpen = !isCartDrawerOpen;
					}}
					class="relative transform text-gray-700 transition-colors duration-300 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300"
					href="javascript:void(0)"
				>
					<div class="align-center flex justify-center">
						<svg
							class="bi bi-cart"
							fill="currentColor"
							height="20"
							viewBox="0 0 16 16"
							width="20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
							/>
						</svg>
					</div>
					{#if $carts && $carts.length}
						<div
							class="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white"
						>
							{$carts.length}
						</div>
					{/if}
				</a>
				{#if !isAuthenticated}
					<a
						class="ml-5 block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
						href="/login"
					>
						Login
					</a>
				{:else}
					<UserMenu />
				{/if}
			</div>

			<div class="flex lg:hidden">
				<button
					on:click={() => {
						document.body.classList.toggle('overflow-hidden');
						isMenuOpen = !isMenuOpen;
					}}
					type="button"
					class="ml-4 text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
					aria-label="toggle menu"
				>
					{#if !isMenuOpen}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
		<div
			class="{isMenuOpen
				? 'translate-x-0 opacity-100 '
				: '-translate-x-full opacity-0'} absolute inset-x-0 top-[70px] z-20 w-full bg-white px-6 py-4 transition-all duration-300 ease-in-out dark:bg-gray-800 md:relative md:top-0 md:top-[unset] md:order-1 md:mt-0 md:flex md:w-auto md:translate-x-0 md:items-center md:bg-transparent md:p-0 md:opacity-100"
		>
			<div class="flex flex-col md:mx-6 md:flex-row">
				{#if $categories && $categories.length}
					{#each $categories as category, i (`header-category-${i}`)}
						<a
							class="{currentCategory === category
								? 'text-blue-500 dark:text-blue-500'
								: ''} my-2 transform capitalize text-gray-700 transition-colors duration-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 md:mx-4 md:my-0"
							href={`/products?category=${category}`}
						>
							{category}
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</nav>

<Cart bind:isCartDrawerOpen />
