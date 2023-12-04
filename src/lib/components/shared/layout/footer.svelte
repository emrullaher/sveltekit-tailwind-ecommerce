<script>
	import { categories } from '$lib/stores/categories.js';
	import Logo from '$lib/components/shared/logo.svelte';
</script>

<footer class="mt-auto bg-white py-16 dark:border-t dark:border-gray-300 dark:bg-gray-900">
	<div class="container mx-auto">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<div>
				<a class="block text-teal-600" href="/">
					<Logo />
				</a>

				<p
					class="mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400 sm:max-w-xs sm:text-left"
				>
					Your go-to app for unbeatable shopping deals. Explore a world of savings today!
				</p>

				<ul class="mt-8 flex justify-center gap-4 sm:justify-start">
					<li>
						<a
							class="text-teal-700 transition hover:text-teal-700/75 dark:text-teal-500 dark:hover:text-teal-500/75"
							href="https://github.com/emrullaher"
							rel="noreferrer"
							target="_blank"
						>
							<span class="sr-only">GitHub</span>
							<svg
								aria-hidden="true"
								class="h-6 w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<path
									clip-rule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									fill-rule="evenodd"
								/>
							</svg>
						</a>
					</li>
				</ul>
			</div>

			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
				<div class="text-center sm:text-left">
					<p class="text-lg font-medium text-gray-900 dark:text-white">About Us</p>

					<ul class="mt-8 space-y-4 text-sm">
						<li>
							<a
								class="capitalize text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
								href="/company-history"
							>
								Company History
							</a>
						</li>

						<li>
							<a
								class="capitalize text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
								href="/team"
							>
								Meet the Team
							</a>
						</li>

						<li>
							<a
								class="capitalize text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
								href="/careers"
							>
								Careers
							</a>
						</li>

						<li>
							<a
								class="capitalize text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
								href="/contact-us"
							>
								Contact Us
							</a>
						</li>
					</ul>
				</div>

				{#if $categories.length > 0}
					<div class="text-center sm:text-left">
						<p class="text-lg font-medium text-gray-900 dark:text-white">Categories</p>

						<ul class="mt-8 space-y-4 text-sm">
							{#each $categories as category, i (`footer-category-${i}`)}
								<li>
									<a
										class="capitalize text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
										href={`/products?category=${category}`}
									>
										{category}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="text-center sm:text-left">
					<p class="text-lg font-medium text-gray-900 dark:text-white">Helpful Links</p>

					<ul class="mt-8 space-y-4 text-sm">
						<li>
							<a
								class="capitalize text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
								href="/faq"
							>
								FAQs
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="mt-12 border-t border-gray-100 pt-6 dark:border-gray-300">
			<div class="text-center sm:flex sm:justify-between sm:text-left">
				<p class="text-sm text-gray-500 dark:text-gray-400">
					<span class="block sm:inline">All rights reserved.</span>

					<a
						class="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75"
						href="/terms-and-conditions"
					>
						Terms & Conditions
					</a>

					<span>&middot;</span>

					<a
						class="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75"
						href="/privacy-policy"
					>
						Privacy Policy
					</a>
				</p>

				<p class="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:order-first sm:mt-0">
					&copy; <span>{@html new Date().getFullYear()}</span> Fake Store
				</p>
			</div>
		</div>
	</div>
</footer>
