import { redirect } from '@sveltejs/kit';
import { JWT_ACCESS_SECRET } from '$env/static/private'
import jwt from 'jsonwebtoken'
import db from '$lib/db.js'

export async function load( {locals }) {

    const user = locals.user;
    return {user};
}

export const actions = {
  logout: async ({cookies}) => {
    cookies.delete("AuthorizationToken", {path: '/'});
    throw redirect(302, "/user-auth");
  },
  delete: async ({cookies}) => {
    console.log("Delete User")
    const authCoookie = cookies.get('AuthorizationToken');

    if (authCoookie) {
        const token = authCoookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
            const user = await db.prepare('DELETE FROM users where user_id = ?').run(jwtUser.id);
            const user_playlist = await db.prepare('DELETE FROM user_playlists where user_id = ?').run(jwtUser.id);

        } catch (error) {
            console.log(error);
        }
    }



    throw redirect(302, "/user-auth");
  }
}


