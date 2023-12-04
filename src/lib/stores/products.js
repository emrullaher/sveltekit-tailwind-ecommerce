import { writable } from 'svelte/store';
import axios from 'axios';
import logger from '$lib/utils/log.js';
import { BRANDS, COLORS, SIZES } from '$lib/utils/constants.js';
import { PUBLIC_API_URL } from '$env/static/public';

export let product = writable([]);
export let products = writable([]);

/**
 * This Method Gets All Products
 * @returns {Promise<products>}
 * @example
 * import { getProducts } from 'lib/stores/products';
 * getProducts();
 */
export const getProducts = async () => {
	try {
		const url = `${PUBLIC_API_URL}/products`;

		const response = await axios.get(url);
		const data = await response.data;

		// Adding random color, size and brand to each product because the API doesn't provide them
		data.forEach((product) => {
			addRandomValues(product);
		});
		products.set(data);
		logger.info({ label: 'getProducts', message: data });
		return data;
	} catch (e) {
		logger.error({ label: 'getProducts', message: e });
	}
};

/**
 * This Method Gets a Product by ID
 * @param id {string}
 * @returns {Promise<void>}
 * @example
 * import { getProductById } from 'lib/stores/products';
 * getProductById(1);
 */
export const getProductById = async (id) => {
	try {
		const url = `${PUBLIC_API_URL}/products/${id}`;
		const response = await axios.get(url);
		let data = await response.data;
		data = addRandomValues(data);
		product.set(data);
		logger.info({ label: 'getProductById', message: data });
	} catch (e) {
		logger.error({ label: 'getProductById', message: e });
	}
};

/**
 * This Method Adds Random Color, Size and Brand to Each Product
 * @param product
 * @returns {*}
 * @example
 * import { addRandomValues } from 'lib/stores/products';
 * addRandomValues(product);
 */
const addRandomValues = (product) => {
	product.color = COLORS[Math.floor(Math.random() * COLORS.length)].value;
	product.size = SIZES[Math.floor(Math.random() * SIZES.length)].value;
	product.brand = BRANDS[Math.floor(Math.random() * BRANDS.length)].value;
	return product;
};
