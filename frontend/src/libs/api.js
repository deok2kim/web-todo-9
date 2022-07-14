const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'production-url';

export const getTodos = () => {
  return fetch(`${BASE_URL}/todo`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
