import { writable } from 'svelte/store';

export let alert = writable({});

/**
 * Set alert message
 * @param {string} title - alert title
 * @param {string} message - alert message
 * @param {string} type - success, error, warning, info
 *
 * @example
 * import { setAlert } from 'src/lib/stores/alert';
 * setAlert('Success message', 'success');
 */
export let setAlert = ({ title, type, message }) => {
	alert.set({ title, message, type });
};
