import { Router } from "express";
import { getAllUser, login, signUp } from "../controller/user.controller";

const router = Router();

router.route("/").get(getAllUser);

router.route("/signup").post(signUp);
router.route("/login").post(login);

export default router;
