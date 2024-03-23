import { JWT_ACCESS_SECRET } from '$env/static/private'

export const handle = async ({event, resolve}) => {
    const authCoookie = event.cookies.get('AuthorizationToken');

    if (authCoookie) {
        const token = authCoookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET)
        }
    }
}