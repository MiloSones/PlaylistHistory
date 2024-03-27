import { generateRandomString } from '$lib/helpers.js';
import { fail, redirect } from '@sveltejs/kit';
import { CLIENT_ID } from '$env/static/private';
import querystring from 'querystring';
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
    const authCoookie = cookies.get('AuthorizationToken');

    if (authCoookie) {
        const token = authCoookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
            await db.prepare('DELETE FROM users where user_id = ?').run(jwtUser.id);
            await db.prepare('DELETE FROM user_playlists where user_id = ?').run(jwtUser.id);

        } catch (error) {
            console.log(error);
        }
    }
    throw redirect(302, "/user-auth");
  },

  link: async ({cookies}) => {
    const authCoookie = cookies.get('AuthorizationToken');

    if (authCoookie) {
        const token = authCoookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
        } catch (error) {
            console.log(error);
        }
        const state = generateRandomString(16);
        // Move scope and redirect_uri to better place later.
        const scope = 'user-read-private user-read-email';
        const client_id = CLIENT_ID
        const redirect_uri = "http://localhost:5173/callback"
        const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
          response_type: 'code',
          client_id,
          scope,
          redirect_uri,
          state
        });
        throw redirect(302, authUrl);
    }
    return fail(500, "Failed to link to Spotify")
  }
}



