import connection from "../lib/db.js";
import { createRes } from "../utils/create-response.js";
import { statusCode } from "../utils/status-code.js";

export const getNoti = async (req, res) => {
  const LIMIT = 10;
  try {
    connection
      .promise()
      .query(
        "select Noti.id, Noti.action, Noti.payload, Noti.createdAt, Todo.title, Todo.type, Todo.author from `Noti` JOIN `Todo` ON Todo.id = Noti.todoId limit ?",
        [LIMIT]
      )
      .then((notiResult) => {
        const [rows] = notiResult;
        res
          .status(statusCode.OK)
          .send(createRes.success(statusCode.OK, "success", rows));
      });
  } catch (e) {
    console.error(e);
    res
      .status(statusCode.INTERNAL_ERROR)
      .send(createRes.fail(statusCode.INTERNAL_ERROR, "서버 내부 오류"));
  }
};

export const createNoti = async (req, res) => {
  try {
    const { action, payload, todoId } = req.body;
    if (!action || !todoId) {
      throw new Error("action 또는 todoId 값이 없습니다.");
    }

    connection
      .promise()
      .query(
        "insert into Noti(`action`, `payload`, `todoId`) values (?, ?, ?)",
        [action, JSON.stringify(payload), todoId]
      )
      .then(() => {
        res
          .status(statusCode.OK)
          .send(createRes.success(statusCode.OK, "생성됨"));
      });
  } catch (e) {
    console.error(e);
    res
      .status(statusCode.INTERNAL_ERROR)
      .send(createRes.fail(statusCode.INTERNAL_ERROR, "서버 내부 오류"));
  }
};
