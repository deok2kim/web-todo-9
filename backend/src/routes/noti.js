import express from "express";
import { createNoti, getNoti } from "../controller/noti.js";
const router = express.Router();

router.get("/", getNoti);

export default router;
