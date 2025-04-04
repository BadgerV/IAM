import { Pool } from "pg";
import { DBConfig } from "../config/config";
import fs from "fs";
import path from "path";

// Path to your saved CA certificate
const caCertPath = path.join(__dirname, "../config", "ca.pem");
// Read the CA certificate file
const caCert = fs.readFileSync(caCertPath).toString();

const pool = new Pool({
  connectionString: DBConfig.DB_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

export default pool;
