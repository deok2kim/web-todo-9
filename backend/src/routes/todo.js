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

router.patch("/:id", patchTodo);

router.delete("/:id", deleteTodo);

export default router;
