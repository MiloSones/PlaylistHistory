import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET } from '$env/static/private'
import bcrypt from 'bcrypt';
import db from '$lib/db';

export async function createUser(username, password) {
    try {
        const user = {
            username: username,
            password: await bcrypt.hash(password,12)
        };

        const prepare_user = await db.prepare('INSERT INTO users (username, password) VALUES (?,?)');
        const user_info = await prepare_user.run(user.username, user.password);
        user.user_id = user_info.lastInsertRowid;
        const token = createJWT(user);
        return {token};
    }
    catch (error) {
        console.log(error);
        return error
    }
}

function createJWT(user) {
    return jwt.sign({id: user.user_id, username: user.username}, JWT_ACCESS_SECRET, {expiresIn: '1d'});
}

export async function loginUser(username, password) {
    try {
        const user = await db.prepare("SELECT username, password, user_id FROM users WHERE username= ?").get(username);
        console.log(user);
        if (!user) {
            console.log("No User")
            return {error: 'User not found'};
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return {error: "Invalid password"};
        }

        const token = createJWT(user);

        return {token};
    } catch (error) {
        return error;
    }
}