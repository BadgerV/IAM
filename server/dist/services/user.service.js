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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailVerification = exports.sendEmailVerification = exports.getUserById = exports.getUsers = exports.getUserByEmail = exports.createUser = void 0;
const connect_1 = __importDefault(require("../db/connect"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      INSERT INTO users (username, email, password, is_admin)
      VALUES ($1, $2, $3, $4)
    `;
        const values = [user.username, user.email, user.password, user.is_admin];
        yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.createUser = createUser;
const sendEmailVerification = (token, email) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "UPDATE users SET verification_code = $1 WHERE email = $2 RETURNING *";
        const values = [token, email];
        yield client.query(query, values);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        client.release();
    }
});
exports.sendEmailVerification = sendEmailVerification;
const verifyEmailVerification = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM users WHERE verification_code = $1";
        const { rows } = yield client.query(query, [token]);
        return rows[0];
    }
    catch (error) {
        console.error(error);
    }
    finally {
        client.release();
    }
});
exports.verifyEmailVerification = verifyEmailVerification;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const { rows } = yield client.query(query, [email]);
        return rows[0];
    }
    finally {
        client.release();
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        // Updated query to join the users table with the permissions table
        const query = `
      SELECT users.*, permissions.role 
      FROM users 
      LEFT JOIN permissions ON users.id = permissions.user_id 
      WHERE users.id = $1;
    `;
        const { rows } = yield client.query(query, [id]);
        return rows[0]; // Assuming there's only one user with a unique id
    }
    finally {
        client.release();
    }
});
exports.getUserById = getUserById;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      SELECT 
        users.id,
        users.username,
        users.email,
        users.is_admin,
        permissions.* 
      FROM 
        users
      LEFT JOIN 
        permissions ON users.id = permissions.user_id;
    `;
        const { rows } = yield client.query(query);
        console.log(rows);
        return rows;
    }
    finally {
        client.release();
    }
});
exports.getUsers = getUsers;
