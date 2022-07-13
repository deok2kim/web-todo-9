import connection from "../lib/db.js";
import { createRes } from "../utils/create-response.js";
import { statusCode } from "../utils/status-code.js";

export const getNoti = async (req, res) => {};

export const createNoti = async (req, res) => {
  try {
    const { action, todoId } = req.body;
    if (!action.type || !todoId || !action.after) {
      throw new Error("action 또는 todoId 값이 없습니다.");
    }

    connection
      .promise()
      .query("insert into Noti(`action`, `todoId`) values (?, ?)", [
        JSON.stringify(action),
        todoId,
      ])
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
