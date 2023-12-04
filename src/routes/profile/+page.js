import { goto } from '$app/navigation';

export const load = async ({ parent }) => {
	const data = await parent();

	if (!data.user) {
		goto(`/login`);
	}

	return {};
};
