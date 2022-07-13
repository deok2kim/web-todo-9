import { createRes } from "../utils/create-response.js";
import { statusCode } from "../utils/status-code.js";
import db from "../lib/db.js";

import express from "express";
const router = express.Router();

router.get("/", function (_req, res, _next) {
  res
    .status(statusCode.OK)
    .send(
      createRes.success(
        statusCode.OK,
        "테스트 라우트",
        db.query(`SELECT * FROM todo;`)
      )
    );
});

export default router;
