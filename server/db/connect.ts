import { Pool } from "pg";
import { DBConfig } from "../config/config";


const pool = new Pool({
  connectionString: DBConfig.DB_URL,
  ssl: {
    ca: DBConfig.DB_SSL_CA,
    rejectUnauthorized: true
  }
});

export default pool;
