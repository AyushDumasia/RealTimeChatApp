import { Router } from "express";
import { getAllUser, signUp } from "../controller/user.controller";

const router = Router();

router.route("/").get(getAllUser).post(signUp);

export default router;
