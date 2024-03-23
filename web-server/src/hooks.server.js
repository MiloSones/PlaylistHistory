import { JWT_ACCESS_SECRET } from '$env/static/private'
import { db } from '$lib/db.js'

export const handle = async ({event, resolve}) => {
    const authCoookie = event.cookies.get('AuthorizationToken');

    if (authCoookie) {
        const token = authCoookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
            const user = await db.prepare("SELECT user_id, email FROM users WHERE user_id = ?").get(jwtUser.user_id);
            if (user) {
                event.locals.user = user;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return await resolve(event);
};