import { Pool } from "pg";
import { DBConfig } from "../config/config";



const pool = new Pool({
  connectionString: DBConfig.DB_URL,
  ssl: {
    rejectUnauthorized: false // Set to true in production if using valid certificates
  }
});

export default pool;
