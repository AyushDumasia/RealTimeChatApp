import { Router } from "express";
import { addUser, getAllUser } from "../controller/user.controller";

const router = Router();

router.route("/").get(getAllUser).post(addUser);

export default router;
