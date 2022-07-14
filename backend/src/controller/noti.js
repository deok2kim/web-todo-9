import connection from "../lib/db.js";
import { createRes } from "../utils/create-response.js";
import { statusCode } from "../utils/status-code.js";

export const getNoti = async (req, res) => {
  const LIMIT = 10;
  try {
    connection
      .promise()
      .query(
        "select Noti.id, Noti.action, Noti.payload, Noti.createdAt, Todo.title, Todo.type, Todo.author from `Noti` JOIN `Todo` ON Todo.id = Noti.todoId order by id desc limit ?",
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

export const createNoti = async (data) => {
  try {
    const { action, payload, todoId } = data;
    if (!action || !todoId) {
      throw new Error("action 또는 todoId 값이 없습니다.");
    }

    return connection
      .promise()
      .query(
        "insert into Noti(`action`, `payload`, `todoId`) values (?, ?, ?)",
        [action, JSON.stringify(payload), todoId]
      );
  } catch (e) {
    console.error(e);
  }
};
