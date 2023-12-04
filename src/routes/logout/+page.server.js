import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		await cookies.delete('token', { path: '/' });
		throw redirect(303, '/');
	}
};
