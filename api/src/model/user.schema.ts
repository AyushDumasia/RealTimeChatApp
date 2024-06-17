import client from "../../Postgres/config";

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    phone CHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);
`;

export async function createTable() {
  try {
    await client.query(createUserTable);
    console.log("User Table created successfully");
  } catch (err) {
    console.error("Error creating table", err);
  }
}
