import { writable } from 'svelte/store';
import axios from 'axios';
import logger from '$lib/utils/log.js';
import { jwtDecode } from 'jwt-decode';
import { PUBLIC_API_URL } from '$env/static/public';

export let user = writable(null);

/**
 * Get user by id
 * @param id
 * @returns {Promise<any>}
 * @example
 * import { getUserById } from 'lib/stores/auth';
 * getUserById(1);
 */
export const getUserById = async (id) => {
	try {
		const url = `${PUBLIC_API_URL}/users/${id}`;
		const response = await axios.get(url);

		user.set(response.data);
		logger.info({ label: 'getUserById', message: response.data });

		return response.data;
	} catch (e) {
		logger.error({ label: 'getUserById', message: e });
	}
};

/**
 * Get user id from token
 * @param token
 * @returns {Promise<boolean|string>}
 * @example
 * import { getUserIdByToken } from 'lib/stores/auth';
 * getUserIdByToken('token');
 */
export const getUserIdByToken = async (token) => {
	try {
		const decoded = jwtDecode(token);
		return decoded.sub;
	} catch (e) {
		logger.error({ label: 'getUserIdByToken', message: e });
		return false;
	}
};

/**
 * Login user
 * @param username
 * @param password
 * @returns {token | boolean}
 * @example
 * import { login } from 'lib/stores/auth';
 * login('username', 'password');
 */
export const login = async (username = 'jimmie_k', password = 'klein*#%*') => {
	try {
		const url = `${PUBLIC_API_URL}/auth/login`;
		const response = await axios.post(url, {
			username,
			password
		});
		const token = response.data?.token;
		logger.info({ label: 'login', message: response.data });
		return token;
	} catch (e) {
		logger.error({ label: 'login', message: e });
		return false;
	}
};
