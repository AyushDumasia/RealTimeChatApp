import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler.utils";
import client from "../../Postgres/config";
import { ApiError } from "../utils/ApiError.utils";
import { ApiResponse } from "../utils/ApiResponse.utils";

// !POST // !Send Message
export const sendMessage = AsyncHandler(async (req: Request, res: Response) => {
  const message = req.body.message;
  const receiverID = req.params.receiverID;
  const user_id = req.user.id;

  const [receiverResult, senderResult] = await Promise.all([
    client.query("SELECT user_id FROM users WHERE user_id = $1", [receiverID]),
    client.query("SELECT user_id FROM users WHERE user_id = $1", [user_id]),
  ]);

  const receiver = receiverResult.rows[0];
  const sender = senderResult.rows[0];

  if (!sender || !receiver) {
    throw new ApiError(404, "Sender or receiver not found");
  }

  const insertMessageQuery = `
    INSERT INTO messages (receiver_id, sender_id, message)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [receiverID, user_id, message];

  const insertResult = await client.query(insertMessageQuery, values);

  res
    .status(200)
    .json(
      new ApiResponse(200, insertResult.rows[0], "Message sent successfully")
    );
});

// !GET // Show Message
//TODO : May be bug for displaying messages
export const showMessage = AsyncHandler(async (req: Request, res: Response) => {
  const user_id = req.user.id;
  const receiverID = req.params.receiverID;

  const messageQuery = `
    SELECT *
    FROM messages
    WHERE
    (sender_id = $1 AND receiver_id = $2)
    OR
    (sender_id = $2 AND receiver_id = $1)
    ORDER BY created_at DESC;  
  `;
  const values = [user_id, receiverID];

  const result = await client.query(messageQuery, values);

  res
    .status(200)
    .json(new ApiResponse(200, result.rows, "Messages fetched successfully"));
});
