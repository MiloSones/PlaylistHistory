import { createUser } from '$lib/user.js';
import { setAuthToken } from '$lib/helpers.js';
import { db } from '$lib/db.js'
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const formData = Object.fromEntries(await request.formData());
        const {username, password} = formData;
        const {error, token} = await createUser(username, password, db);
        if (error) {
            console.log(error);
            return fail(500, {error});
        }

        setAuthToken({cookies, token});

        throw redirect(302, "/user-auth")
    }
}