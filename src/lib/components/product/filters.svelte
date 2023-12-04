<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let filters;

	function onFilterChange(e) {
		const { name, value, checked } = e.target;
		const filter = filters[name];
		const index = filter.findIndex((item) => item.value === value);
		filter[index].checked = checked;
		dispatch('filterChange', filters);
	}
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-600">
	{#each Object.keys(filters) as filter, y (`filter-${y}`)}
		<div class="px-4 py-4">
			<h3 class="mb-3 text-xl font-medium uppercase text-gray-800 dark:text-gray-300">{filter}</h3>
			<div class="space-y-2">
				{#each filters[filter] as item, i (`filter-item-${i}`)}
					{#if item.type === 'select' || item.type === 'rating'}
						<div>
							<div class="flex items-center">
								<input
									on:change={onFilterChange}
									type="checkbox"
									name={filter}
									id={item.name}
									class="cursor-pointer rounded-sm text-primary focus:ring-0"
									value={item.value}
									checked={item.checked}
								/>
								<label for={item.name} class="ml-3 capitalize text-gray-600 dark:text-gray-300">
									{item.name}
								</label>

								{#if item.type === 'rating'}
									<div class="ml-auto flex items-center space-x-1">
										{#each Array.from({ length: item.value }) as rating}
											<svg
												class="h-4 w-4 text-yellow-300"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 22 20"
												data-rate={rating}
											>
												<path
													d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
												/>
											</svg>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					{:else if item.type === 'size'}
						<div class="size-selector inline-block space-x-2">
							<input
								on:change={onFilterChange}
								type="checkbox"
								name="size"
								id={item.name}
								class="hidden"
								value={item.value}
							/>
							<label
								for={item.name}
								class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs capitalize text-gray-600 shadow-sm dark:text-gray-300"
								class:bg-teal-700={item.checked}
								class:text-white={item.checked}
							>
								{item.name}
							</label>
						</div>
					{:else if item.type === 'color'}
						<div class="inline-flex items-center space-x-2">
							<input
								on:change={onFilterChange}
								type="checkbox"
								name="color"
								id={item.name}
								class="hidden"
								value={item.value}
							/>
							<label
								for={item.name}
								class="block h-6 w-6 cursor-pointer rounded-sm border border-gray-200 shadow-sm"
								style={`background-color: ${item.value};`}
							>
								{#if item.checked}
									<svg
										class="ml-auto mr-auto h-full text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fill-rule="evenodd"
											d="M10.707 13.293a1 1 0 0 1-1.414 0L5 9.414l1.414-1.414L9 10.586l4.293-4.293L15 7.414l-5.293 5.293z"
										/>
									</svg>
								{/if}
							</label>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>
