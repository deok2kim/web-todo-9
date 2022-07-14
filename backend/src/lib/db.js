import mysql from "mysql2";

const pool = mysql.createPool({
  host: "ec2-15-165-8-120.ap-northeast-2.compute.amazonaws.com",
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
});

console.log(`-----------------------------------`);
console.log(`mySQL is Connected.`);
console.log(`-----------------------------------`);

export default pool;
