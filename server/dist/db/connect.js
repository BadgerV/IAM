"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: "postgresql://iam_kiyy_user:Btq2xkGFg66dXcGM19nCiXuC7yhlJEyh@dpg-cvo0b17gi27c73bq0btg-a.oregon-postgres.render.com/iam_kiyy",
    ssl: {
        rejectUnauthorized: false, // Set to true to enforce certificate validation
    },
});
exports.default = pool;
