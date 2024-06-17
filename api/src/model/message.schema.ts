import client from "../../Postgres/config";

const createMessageTable = `
CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    receiver_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id)
)`;

export async function createMessageSchema() {
  try {
    await client.query(createMessageTable);
    console.log("Message Table created successfully");
  } catch (err) {
    console.error("Error creating table", err);
  }
}
