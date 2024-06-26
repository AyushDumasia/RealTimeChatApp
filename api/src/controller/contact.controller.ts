import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler.utils";
import client from "../../Postgres/config";
import { ApiError } from "../utils/ApiError.utils";
import { ApiResponse } from "../utils/ApiResponse.utils";

// !GET / Create Contact
export const createContact = AsyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user.id;
    const contact_id = req.params.id;

    const contactUser = await client.query(
      `SELECT user_id FROM users WHERE user_id = $1`,
      [contact_id]
    );

    if (contactUser.rows.length === 0)
      throw new ApiError(404, "Contact not found");

    const checkContact = await client.query(
      `SELECT * FROM contacts WHERE user_id = $1 AND contact_user_id = $2`,
      [user_id, contact_id]
    );

    if (checkContact.rows.length > 0)
      throw new ApiError(400, "Contact already exists in your contact list");

    const newContact = await client.query(
      `INSERT INTO contacts (user_id, contact_user_id) VALUES ($1, $2) RETURNING *`,
      [user_id, contact_id]
    );

    res
      .status(201)
      .json(new ApiResponse(201, newContact.rows[0], "User added in contact"));
  }
);

export const showContact = AsyncHandler(async (req: Request, res: Response) => {
  const user_id = req.user.id;

  const query = `
    SELECT contacts.*, users.*
    FROM contacts
    JOIN users ON contacts.user_id = users.user_id
    WHERE contacts.user_id = $1
  `;

  const contacts = await client.query(query, [user_id]);

  res.status(200).json(new ApiResponse(200, contacts.rows));
});
