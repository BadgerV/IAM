"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("../config/config");
const pool = new pg_1.Pool({
    user: config_1.DBConfig.DB_USER,
    host: config_1.DBConfig.DB_HOST,
    database: config_1.DBConfig.DB_NAME,
    password: config_1.DBConfig.DB_PASSWORD,
    port: config_1.DBConfig.DB_PORT,
});
exports.default = pool;
