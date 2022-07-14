import connection from "../lib/db.js";
import { createRes } from "../utils/create-response.js";
import { createUpdateQuery } from "../utils/create-update-query.js";
import { statusCode } from "../utils/status-code.js";

const TODO_TYPE_LIST = ["todo", "onProgress", "done"];

const getTodoByType = (type) => {
  return connection
    .promise()
    .query('SELECT `title`, `author`, `body`, `type`, `order`, `id` FROM `Todo` WHERE isDeleted = 0 AND `type`= ?;', [type])
};

export const getTodo = (_req, res) => {
  try {
    const promises = TODO_TYPE_LIST.map(getTodoByType);
    Promise.all(promises).then((completedList) => {
      let refinedTodo = [];

      completedList.forEach(([row], index) => {
        refinedTodo[index] = {
          type: TODO_TYPE_LIST[index],
          todos: row,
        };
      });

      res
        .status(statusCode.OK)
        .send(createRes.success(statusCode.OK, "success", refinedTodo));
    });
  } catch (error) {}
};

export const createTodo = (req, res) => {
  const todo = req.body;
  if (!req.body)
    res
      .status(statusCode.BAD_REQUEST)
      .send(createRes.fail(statusCode.BAD_REQUEST, "empty body"));

  const { title, body, author, type } = todo;

  try {
    connection
      .promise()
      .query("SELECT MAX(`order`) as maxOrder from Todo;")
      .then((orderResult) => {
        const [rows] = orderResult;
        const { maxOrder } = rows[0];

        connection.query(
          "INSERT INTO Todo (`title`, `body`, `type`, `author`, `order`) VALUES(?, ?, ?, ?, ?);",
          [title, body, type, author, maxOrder ? maxOrder + 100 : 100],
          (err) => {
            if (err) throw Error(err);

            res
              .status(statusCode.CREATED)
              .send(createRes.fail(statusCode.CREATED, "생성됨"));
          }
        );
      });
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_ERROR)
      .send(createRes.fail(statusCode.INTERNAL_ERROR, "서버 내부 오류"));
  }
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;
  if (!id)
    res
      .status(statusCode.BAD_REQUEST)
      .send(createRes.fail(statusCode.BAD_REQUEST, "NO card id"));

  try {
    connection
      .promise()
      .query("UPDATE `Todo` SET `isDeleted` = 1 WHERE id = ?", [id])
      .then(() => {
        res
          .status(statusCode.OK)
          .send(createRes.success(statusCode.OK, "삭제됨"));
      });
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_ERROR)
      .send(createRes.fail(statusCode.INTERNAL_ERROR, "서버 내부 오류"));
  }
};

export const patchTodo = async (req, res) => {
  const { id } = req.params;
  if (!id)
    res
      .status(statusCode.BAD_REQUEST)
      .send(createRes.fail(statusCode.BAD_REQUEST, "NO card id"));

  if (!req.body)
    res
      .status(statusCode.BAD_REQUEST)
      .send(createRes.fail(statusCode.BAD_REQUEST, "NO body"));

  try {
    connection
      .promise()
      .query(
        "UPDATE `Todo` SET " + createUpdateQuery(req.body) + " WHERE `id` = ?",
        [id]
      )
      .then(() => {
        res
          .status(statusCode.OK)
          .send(createRes.success(statusCode.OK, "변경되었음."));
      });
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_ERROR)
      .send(createRes.fail(statusCode.INTERNAL_ERROR, "서버 내부 오류"));
  }
};
