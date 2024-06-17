import { Router } from "express";
import { validateToken } from "../middleware/userAuth.middleware";
import { createContact, showContact } from "../controller/contact.controller";
const router = Router();

router.route("/addContact/:id").get(validateToken, createContact);

router.route("/").get(validateToken, showContact);

export default router;
