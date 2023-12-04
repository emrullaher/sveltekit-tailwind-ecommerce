import { dev } from '$app/environment';
import { login } from '$lib/stores/auth.js';
import { fail, redirect } from '@sveltejs/kit';
export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		const token = await login(username, password);
		if (!token) {
			return fail(400, { token, incorrect: true });
		}

		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(303, '/profile');
	}
};
