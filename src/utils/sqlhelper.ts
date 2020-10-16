import mysql from "mysql";
import { configure, getLogger } from "log4js";

require("dotenv").config();
configure({
  appenders: { logs_sql: { type: "file", filename: "./logs/logs_sql.log" } },
  categories: { default: { appenders: ["logs_sql"], level: "error" } },
});
/** Cau hinh bo sung them file khac */
// configure({
//     appenders: { info_sql: { type: "file", filename: "./logs/info_sql.log" } },
//     categories: { default: { appenders: ["info_sql"], level: "info" } }
// });

const isDev = process.env.NODE_ENV !== "production" ? false : true;
const host = isDev ? process.env.DEV_HOST : process.env.HOST;
const user = isDev ? process.env.DEV_USER : process.env.USER;
const password = isDev ? process.env.DEV_PASSWORD : process.env.PASSWORD;
const database = isDev ? process.env.DEV_DATABASE : process.env.DATABASE;
const port = Number(isDev ? process.env.DEV_PORT : process.env.PORT);

const connection = mysql.createPool({
  host,
  user,
  password,
  database,
  port,
  timezone: "+00:00",
  connectTimeout: 30000,
  acquireTimeout: 30000,
  connectionLimit: 15,
});

const query = async (sql: string, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, result) =>
      error ? reject({ message: error?.message }) : resolve(result)
    );
  })
    .then((result: any) => {
      // update, delete, insert into table
      if (result.changedRows > 0 || result.affectedRows > 0) return true;
      return result;
    })
    .catch((error) =>
      getLogger(JSON.stringify({ sql, params })).error(error.message)
    )
    .finally(() => connection.end());
};

module.exports = query;
