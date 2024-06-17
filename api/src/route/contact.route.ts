import { Router } from "express";
import { validateToken } from "../middleware/userAuth.middleware";
import { createContact } from "../controller/contact.controller";
const router = Router();

router.route("/addContact/:id").get(validateToken, createContact);

export default router;
