import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PWD,
  database: "week2",
});

connection.connect(function (err) {
  if (err) console.log("fail to connect mySQL with", err);
});

console.log(`-----------------------------------`);
console.log(`mySQL is Connected.`);
console.log(`-----------------------------------`);

connection.end();

export default connection;
