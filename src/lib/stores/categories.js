import { writable } from 'svelte/store';
import axios from 'axios';
import logger from '$lib/utils/log.js';
import { PUBLIC_API_URL } from '$env/static/public';
export let categories = writable([]);

/**
 * Get categories from fakestoreapi.com and set it to categories store
 * @returns {Promise<*>}
 * @example
 * import { getCategories } from 'lib/stores/categories';
 * getCategories();
 */
export const getCategories = async () => {
	try {
		const url = `${PUBLIC_API_URL}/products/categories`;
		const response = await axios.get(url);
		categories.set(response.data);
		logger.info({ label: 'getCategories', message: response.data });
		return response.data;
	} catch (e) {
		logger.error({ label: 'getCategories', message: e });
	}
};
