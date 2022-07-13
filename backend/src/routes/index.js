import todoRouter from "./todo.js";
import notiRouter from "./noti.js";

import express from "express";
const router = express.Router();

router.use("/todo", todoRouter);

router.use("/noti", notiRouter);

export default router;
