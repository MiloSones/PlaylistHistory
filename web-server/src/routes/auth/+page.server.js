import { GET } from './+server.js';

/** @type {import('./$types').Load} */
export const load = async () => {
    await GET();
};