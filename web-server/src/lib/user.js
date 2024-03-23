import { db } from '$lib/db.js'
import { jwt } from 'jsonwebtoken'
import { JWT_ACCESS_SECRET } from '$env/static/private'

export async function createUser(email, password) {
    try {
        const prepare_user = db.preppare("INSERT INTO users (username) (password) VALUES (?,?)");
        const user = prepare_user.run(email,password);
        const token = createJWT(user);

        return {token};
    }
    catch (error) {
        return error
    }
}

function createJWT(user) {
    return jwt.sign({id: user.user_id, email: user.email}, JWT_ACCESS_SECRET, {expiresIn: '1d'});
}