import { getUserById, getUserIdByToken } from '$lib/stores/auth.js';

const protectedRoutes = ['/profile'];

export const handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (token && event.url.pathname === '/logout') {
		return resolve(event);
	}

	if (token) {
		const userId = await getUserIdByToken(token);
		event.locals.user = await getUserById(userId);
	}

	if (!token && protectedRoutes.includes(event.url.pathname)) {
		return redirect('/', 'No authenticated user');
	}

	return resolve(event);
};

function redirect(location, body) {
	return new Response(body, {
		status: 301,
		headers: { location }
	});
}
