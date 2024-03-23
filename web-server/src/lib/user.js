import { db } from '$lib/db.js'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET } from '$env/static/private'
import bcrypt from 'bcrypt';

export async function createUser(email, password) {
    try {
        const prepare_user = db.preppare("INSERT INTO users (username) (password) VALUES (?,?)");
        const user = prepare_user.run(email,await bcrypt.hash(password,12));
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