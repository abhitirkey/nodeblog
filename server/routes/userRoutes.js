import express from "express";
import { AuthenticateUser, saveUser } from "../controller/userController.js";

const router = express.Router();

router.post("/login", AuthenticateUser);

router.post("/saveUser", saveUser);

export default router;