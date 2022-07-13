export const createUpdateQuery = (body) => {
  if (typeof body !== "object") return "";

  return Object.entries(body)
    .map(([key, val]) => `${key}="${val}"`)
    .join(", ");
};
