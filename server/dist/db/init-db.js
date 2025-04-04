"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const pg_1 = require("pg");
// import bcrypt from "bcrypt";
const user_service_1 = require("../services/user.service");
const clientConfig = {
    connectionString: "postgresql://iam_kiyy_user:Btq2xkGFg66dXcGM19nCiXuC7yhlJEyh@dpg-cvo0b17gi27c73bq0btg-a.oregon-postgres.render.com/iam_kiyy",
    ssl: {
        rejectUnauthorized: false, // Set to true to enforce certificate validation
    },
};
const clientConfigWithoutDB = {
    connectionString: "postgresql://iam_kiyy_user:Btq2xkGFg66dXcGM19nCiXuC7yhlJEyh@dpg-cvo0b17gi27c73bq0btg-a.oregon-postgres.render.com/iam_kiyy",
    ssl: {
        rejectUnauthorized: false, // Set to true to enforce certificate validation
    },
};
//create the database
const createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client(clientConfigWithoutDB);
    try {
        yield client.connect();
        yield client.query(`CREATE DATABASE ${"accessshield"}`);
        console.log("Database created successfully");
    }
    catch (error) {
        console.log(error);
    }
});
//create tables
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client(clientConfig);
    yield client.connect();
    try {
        yield client.query(`-- Create users table
            CREATE TABLE IF NOT EXISTS users (
              id SERIAL PRIMARY KEY,
              username VARCHAR(50) UNIQUE NOT NULL,
              email VARCHAR(100) UNIQUE NOT NULL,
              password VARCHAR(100) NOT NULL,
              is_admin BOOLEAN NOT NULL DEFAULT FALSE,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              verification_code VARCHAR(5)
            );
            
            -- Create folders table
            CREATE TABLE IF NOT EXISTS folders (
              id SERIAL PRIMARY KEY,
              name VARCHAR(50) NOT NULL,
              description TEXT,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Create files table
            CREATE TABLE IF NOT EXISTS files (
              id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(id) ON DELETE CASCADE,
              folder_id INT REFERENCES folders(id) ON DELETE CASCADE,
              file_name VARCHAR(255) NOT NULL,
              description TEXT,
               file_size VARCHAR(255) NOT NULL,
               access_type VARCHAR(255) NOT NULL,
              cloud_url VARCHAR(500) NOT NULL,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Create permissions table
            CREATE TABLE IF NOT EXISTS permissions (
              id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(id) ON DELETE CASCADE,
              can_read BOOLEAN NOT NULL DEFAULT FALSE,
              can_write BOOLEAN NOT NULL DEFAULT FALSE,
              can_delete BOOLEAN NOT NULL DEFAULT FALSE,
              role VARCHAR(50) NOT NULL,
              is_active BOOLEAN NOT NULL DEFAULT TRUE,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Create access_request table
            CREATE TABLE IF NOT EXISTS access_request (
              id SERIAL PRIMARY KEY,
              file_id INT REFERENCES files(id) ON DELETE CASCADE,
              user_id INT REFERENCES users(id) ON DELETE CASCADE,
              status BOOLEAN,
              reason TEXT,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Create logs table
            CREATE TABLE IF NOT EXISTS logs (
              id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(id) ON DELETE CASCADE,
              file_id INT REFERENCES files(id) ON DELETE CASCADE,
              action_taken TEXT,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );`);
        console.log("Tables created successfully");
    }
    catch (error) {
        console.log(error);
    }
});
//seeding the admin
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = {
        username: "admin",
        email: "segunfaozan112@gmail.com",
        password: config_1.defaultConfig.ADMIN_PASSWORD,
        role: "super_admin",
        is_active: true,
        is_admin: true,
    };
    //hash the password
    const hashedPassword = userInfo.password;
    //config all
    const client = new pg_1.Client(clientConfig);
    yield client.connect();
    //checks if admin exists
    const adminAlreadyExists = yield client.query(`SELECT * FROM users WHERE username = $1`, ["admin"]);
    if (adminAlreadyExists.rows.length === 1) {
        console.log("Admin already exists");
        console.log("Proceeding");
        return;
    }
    else {
        try {
            //creates admin into the users and permissions table
            const query = `
                INSERT INTO users (username, email, password, is_admin) 
                VALUES ($1, $2, $3, $4)
            `;
            const values = [
                userInfo.username,
                userInfo.email,
                hashedPassword,
                userInfo.is_admin,
            ];
            const query2 = `
                INSERT INTO permissions (user_id, can_read, can_write, can_delete, is_active, role) 
                VALUES ($1, $2, $3, $4, $5, $6)
            `;
            yield client.query(query, values);
            const adminUser = yield (0, user_service_1.getUserByEmail)(userInfo.email);
            const values2 = [
                Number(adminUser === null || adminUser === void 0 ? void 0 : adminUser.id),
                true,
                true,
                true,
                true,
                userInfo.role,
            ];
            yield client.query(query2, values2);
            console.log("admin seeded successfully");
        }
        catch (error) {
            console.log(error);
        }
    }
});
//TO INITIALIZE THE DB
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // const client = await pool.connect();
    yield createDatabase();
    yield createTables();
    yield seedAdmin();
});
exports.default = initDB;
