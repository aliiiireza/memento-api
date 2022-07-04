import { Dialect, Sequelize } from "sequelize";

const db = process.env.DB_NAME as string;
const username = process.env.DB_USER as string;
const host = process.env.DB_HOST as string;
const dialect = process.env.DB_DRIVER as Dialect;
const password = process.env.DB_PASSWORD as string;

export default new Sequelize(db, username, password, {
  host,
  dialect,
});
