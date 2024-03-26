import { redirect } from '@sveltejs/kit';
import { loginUser } from '$lib/user.js';
import { setAuthToken } from '$lib/helpers.js';

export const actions = {
	default: async ({cookies, request}) => {
		const formData = Object.fromEntries(await request.formData());
		const {username, password} = formData;
		const {error, token} = await loginUser(username, password);

		if (error) {
			return fail(500, {error});
		}

		setAuthToken({cookies, token});

		throw redirect(302, "/user-auth");
	}
};