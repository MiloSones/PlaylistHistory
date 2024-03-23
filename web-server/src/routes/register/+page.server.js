import { createUser } from '$lib/user.js';
import { setAuthToken } from '$lib/helpers.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
    register: async ({cookies, request}) => {
        const formData = Object.fromEntries(await request.formData());
        const {email, password} = formData;

        const {error, token} = await createUser(email, password);

        if (error) {
            console.log(error);
            return fail(500, {error});
        }

        setAuthToken({cookies, token});

        throw redirect(302, "/user-auth")
    }
}