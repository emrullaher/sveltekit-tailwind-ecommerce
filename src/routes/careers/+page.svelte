<script>
	const jobs = [
		{
			category: 'Engineering',
			title: 'Senior Full Stack Backend Engineer',
			type: 'Full-time',
			location: 'Remote, UK'
		},
		{
			category: 'Engineering',
			title: 'Frontend Developer',
			type: 'Part-time',
			location: 'On-site, USA'
		},
		{
			category: 'Marketing',
			title: 'Digital Marketing Specialist',
			type: 'Contract',
			location: 'Remote, Canada'
		},
		{
			category: 'Design',
			title: 'UI/UX Designer',
			type: 'Full-time',
			location: 'On-site, Germany'
		},
		{
			category: 'Finance',
			title: 'Financial Analyst',
			type: 'Internship',
			location: 'On-site, Australia'
		},
		{
			category: 'IT',
			title: 'Network Administrator',
			type: 'Full-time',
			location: 'Remote, Japan'
		}
	];
</script>

<svelte:head>
	<title>Careers | Fake Store</title>
	<meta
		name="description"
		content="Fake Store is a place where you can find all the products you need."
	/>
</svelte:head>
<hr />

<section class="container mx-auto mb-20 mt-10">
	<h1
		class="text-center text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl"
	>
		Careers
	</h1>

	<p class="mx-auto my-6 max-w-2xl text-center text-gray-500 dark:text-gray-300">
		We are a team of passionate people who work hard to make Fake Store a better place. We are
		looking for people who are enthusiastic and share our vision.
	</p>

	<h2 class="mb-5 mt-10 text-2xl font-bold dark:text-white">Open Positions</h2>

	<div class="grid gap-3 md:grid-cols-2">
		{#each jobs as job}
			<div
				class="group flex w-full max-w-4xl flex-col justify-between gap-3 rounded-md border px-5 py-4 transition-colors duration-300 hover:border-transparent hover:bg-teal-700 dark:border-gray-700 dark:hover:border-transparent sm:flex-row sm:items-center"
			>
				<div>
					<span
						class="text-sm font-semibold capitalize text-gray-700 group-hover:text-white dark:text-white"
					>
						{job.title}
					</span>
					<h3
						class="mt-px font-bold capitalize text-gray-500 group-hover:text-white dark:text-white"
					>
						{job.category}
					</h3>
					<div class="mt-2 flex items-center gap-3">
						<span class="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
							{job.type}
						</span>
						<span
							class="flex items-center gap-1 text-sm text-slate-600 group-hover:text-white dark:text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							{job.location}
						</span>
					</div>
				</div>
				<div>
					<button
						class="flex items-center gap-1 rounded-md bg-teal-800 px-4 py-2 font-medium text-white"
					>
						Apply Now
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</button>
				</div>
			</div>
		{/each}
	</div>
</section>
