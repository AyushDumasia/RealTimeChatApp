import client from "../../Postgres/config";

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
  )
`;

export async function createTable() {
  try {
    await client.query(createUserTable);
    console.log("User Table created successfully");
  } catch (err) {
    console.error("Error creating table", err);
  }
}
