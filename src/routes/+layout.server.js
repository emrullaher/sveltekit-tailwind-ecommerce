import { getCategories } from '$lib/stores/categories.js';
import { getProducts } from '$lib/stores/products.js';

export const load = async ({ locals }) => {
	const categories = await getCategories();
	const products = await getProducts();

	return {
		user: locals?.user,
		categories,
		products
	};
};
