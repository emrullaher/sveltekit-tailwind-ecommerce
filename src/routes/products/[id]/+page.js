import { getProductById } from '$lib/stores/products.js';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	await getProductById(params.id);

	return {};
};
