import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PWD,
  database: "week2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
});

console.log(`-----------------------------------`);
console.log(`mySQL is Connected.`);
console.log(`-----------------------------------`);

export default pool;
