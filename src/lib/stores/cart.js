import { writable } from 'svelte/store';

export let carts = writable([]);
export let totalPrice = writable(0);

/**
 * Get carts from local storage and set to carts store if exist
 * @returns {any|*[]}
 *
 * @example
 * import { getCarts } from 'src/lib/stores/cart';
 * getCarts();
 */
export const getCarts = () => {
	if (localStorage) {
		let _carts = localStorage.getItem('carts');
		if (_carts) {
			carts.set(JSON.parse(_carts));
			return JSON.parse(_carts);
		}
	}
	carts.set([]);
	return [];
};

/**
 * Add cart to carts store and local storage
 * @param cart
 * @param quantity
 * @returns {void}
 *
 * @example
 * import { addToCart } from 'src/lib/stores/cart';
 * addToCart({ id: 2, name: 'Product 2', price: 2000 }, 2);
 */

export const addToCart = (cart, quantity = 1) => {
	let _carts = getCarts();
	let _cart = _carts.find((item) => item.id === cart.id);

	if (_cart) {
		_cart.quantity += quantity;
	} else {
		_carts.push({ ...cart, quantity });
	}

	localStorage.setItem('carts', JSON.stringify(_carts));
	carts.set(_carts);
	calculateTotalPrice();
};

/**
 * Remove cart from carts store and local storage
 * @param cart
 * @returns {void}
 *
 * @example
 * import { removeCart } from 'src/lib/stores/cart';
 * removeCart({ id: 2, name: 'Product 2', price: 2000 });
 */

export const removeCart = (cart) => {
	let _carts = getCarts();
	_carts = _carts.filter((item) => item.id !== cart.id);

	localStorage.setItem('carts', JSON.stringify(_carts));
	carts.set(_carts);
	calculateTotalPrice();
};

/**
 * Calculate total price of carts
 * @returns {number}
 *
 * @example
 * import { calculateTotalPrice } from 'src/lib/stores/cart';
 * calculateTotalPrice();
 * // 10000
 */

export const calculateTotalPrice = () => {
	let _carts = getCarts();
	let total = 0;

	_carts.forEach((item) => {
		total += item.price * item.quantity;
	});
	totalPrice.set(total);
};
