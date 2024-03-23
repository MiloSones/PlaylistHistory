import { JWT_ACCESS_SECRET } from '$env/static/private'
import jwt from 'jsonwebtoken'
import db from '$lib/db.js'

export const handle = async ({event, resolve}) => {
    const authCoookie = event.cookies.get('AuthorizationToken');

    if (authCoookie) {
        const token = authCoookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
            const prepare_user = await db.prepare('SELECT * FROM users WHERE user_id = ?');
        
            const user = await prepare_user.get(jwtUser.user_id);
            console.log(`userId: ${jwtUser.Id}`);
            console.log(`user: ${user}`);
            if (user) {
                console.log(`user: ${Object.values(user)}`);
                event.locals.user = user;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return await resolve(event);
};