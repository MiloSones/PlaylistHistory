import db from '$lib/db';

const dbdata = db.prepare('SELECT * FROM users').all();


export const actions = {
	default: async ({ cookies, request }) => {
		console.log("dbdata: ")
		console.log(dbdata);
		const data = await request.formData();
		console.log(data);
	}
};