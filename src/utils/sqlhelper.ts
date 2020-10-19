import mysql from "mysql";
const logger = require("./logger");
require("dotenv").config();

const isProd = process.env.NODE_ENV === "production" ? true : false;
const host = isProd ? process.env.HOST : process.env.DEV_HOST;
const user = isProd ? process.env.USER : process.env.DEV_USER;
const password = isProd ? process.env.PASSWORD : process.env.DEV_PASSWORD;
const database = isProd ? process.env.DATABASE : process.env.DEV_DATABASE;
const port = Number(isProd ? process.env.PORT : process.env.DEV_PORT);

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
  return await new Promise((resolve, reject) => {
    connection.query(sql, params, (error, result) =>
      error ? reject({ message: error?.message }) : resolve(result)
    );
  })
    .then((result: any) => {
      // update, delete, insert into table
      if (result.changedRows > 0 || result.affectedRows > 0) return true;
      return result;
    })
    .catch((error) => logger.error(`${JSON.stringify({ sql, params })} ${error.message}`))
    .finally(() => connection.end());
};

module.exports = query;
