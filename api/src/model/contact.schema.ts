import client from "../../Postgres/config";

const createContactsTable = `
  CREATE TABLE IF NOT EXISTS contacts (
    contact_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    contact_user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (contact_user_id) REFERENCES users(user_id)
  );
`;

export async function createContactSchema() {
  try {
    await client.query(createContactsTable);
    console.log("Contacts table created successfully");
  } catch (err) {
    console.error("Error creating contacts table", err);
  }
}
