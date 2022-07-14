const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'production-url';

export const getTodos = () => {
  return fetch(`${BASE_URL}/todo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createTodo = (todosType, cardInfo) => {
  const { _id, ...todoInfo } = cardInfo;
  return fetch(`${BASE_URL}/todo`, {
    method: 'POST',
    body: JSON.stringify({ ...todoInfo, type: todosType }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateTodo = (nextTodo) => {
  const { id } = nextTodo;
  return fetch(`${BASE_URL}/todo/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: nextTodo.title.trim(),
      body: nextTodo.body.trim(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteTodo = (targetId) => {
  if (!targetId) return;

  return fetch(`${BASE_URL}/todo/${targetId}`, {
    method: 'DELETE',
  });
};
