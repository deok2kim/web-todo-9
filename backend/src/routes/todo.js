import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  patchTodo,
} from "../controller/todo.js";
const router = express.Router();

router.get("/", getTodo);

router.post("/", createTodo);

router.patch("/", patchTodo);

router.delete("/", deleteTodo);

export default router;
