import Database from 'better-sqlite3';

// Create a new SQLite database instance
const db = new Database('../database.db', { verbose: console.log });

// Export the database instance
export default db;