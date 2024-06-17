import { Router } from "express";
import { sendMessage, showMessage } from "../controller/message.controller";
import { validateToken } from "../middleware/userAuth.middleware";

const router = Router();

router.route("/show/:receiverID").get(validateToken, showMessage);

router.route("/send/:receiverID").post(validateToken, sendMessage);

export default router;
