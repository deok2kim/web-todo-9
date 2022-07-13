import connection from "../lib/db.js";
import { createRes } from "../utils/create-response.js";
import { statusCode } from "../utils/status-code.js";

export const getTodo = async (_req, res) => {
  try {
    const todoResult = await connection.promise().query("SELECT * FROM Todo;");
    if (!todoResult)
      res
        .status(statusCode.INTERNAL_ERROR)
        .send(
          createRes.fail(
            statusCode.INTERNAL_ERROR,
            "something wrong in get todo list"
          )
        );

    const [rows] = todoResult;

    res
      .status(statusCode.OK)
      .send(createRes.success(statusCode.OK, "success", rows));
  } catch (error) {}
};

export const createTodo = async (req, res) => {
  const todo = req.body;
  if (!req.body)
    res
      .status(statusCode.BAD_REQUEST)
      .send(createRes.fail(statusCode.BAD_REQUEST, "empty body"));

  const { title, body, author, type } = todo;

  try {
    const orderResult = await connection
      .promise()
      .query("SELECT MAX(`order`) as maxOrder from Todo;");

    const [rows] = orderResult;
    const { maxOrder } = rows;

    connection.query(
      "INSERT INTO Todo (`title`, `body`, `type`, `author`, `order`) VALUES(?, ?, ?, ?, ?);",
      [title, body, type, author, maxOrder ? maxOrder + 100 : 100],
      (err) => console.log(err)
    );

    res
      .status(statusCode.CREATED)
      .send(createRes.fail(statusCode.CREATED, "생성됨"));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_ERROR)
      .send(createRes.fail(statusCode.INTERNAL_ERROR, "서버 내부 오류"));
  }
};

export const deleteTodo = async (req, res) => {};

export const patchTodo = async (req, res) => {};
