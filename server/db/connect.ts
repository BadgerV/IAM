import { Pool } from "pg";
import { DBConfig } from "../config/config";

const pool = new Pool({
  connectionString:
    "postgresql://iam_kiyy_user:Btq2xkGFg66dXcGM19nCiXuC7yhlJEyh@dpg-cvo0b17gi27c73bq0btg-a.oregon-postgres.render.com/iam_kiyy",
  ssl: {
    rejectUnauthorized: false, // Set to true to enforce certificate validation
  },
});

export default pool;
